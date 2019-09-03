import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IOrdenDeTrabajo, OrdenDeTrabajo } from 'app/shared/model/orden-de-trabajo.model';
import { OrdenDeTrabajoService } from './orden-de-trabajo.service';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { ProyectoService } from 'app/entities/proyecto';
import { IAsociado } from 'app/shared/model/asociado.model';
import { AsociadoService } from 'app/entities/asociado';
import { IDominio } from 'app/shared/model/dominio.model';
import { DominioService } from 'app/entities/dominio';

@Component({
  selector: 'jhi-orden-de-trabajo-update',
  templateUrl: './orden-de-trabajo-update.component.html'
})
export class OrdenDeTrabajoUpdateComponent implements OnInit {
  isSaving: boolean;

  proyectos: IProyecto[];

  asociados: IAsociado[];

  dominios: IDominio[];

  editForm = this.fb.group({
    id: [],
    fechaDeRealizacion: [null, [Validators.required]],
    horasEstimadas: [],
    descripcion: [null, [Validators.required]],
    proyecto: [],
    asociado: [],
    estado: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ordenDeTrabajoService: OrdenDeTrabajoService,
    protected proyectoService: ProyectoService,
    protected asociadoService: AsociadoService,
    protected dominioService: DominioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ordenDeTrabajo }) => {
      this.updateForm(ordenDeTrabajo);
    });
    this.proyectoService
      .query({ filter: 'ordendetrabajo-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IProyecto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProyecto[]>) => response.body)
      )
      .subscribe(
        (res: IProyecto[]) => {
          if (!this.editForm.get('proyecto').value || !this.editForm.get('proyecto').value.id) {
            this.proyectos = res;
          } else {
            this.proyectoService
              .find(this.editForm.get('proyecto').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IProyecto>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IProyecto>) => subResponse.body)
              )
              .subscribe(
                (subRes: IProyecto) => (this.proyectos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.asociadoService
      .query({ filter: 'ordendetrabajo-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IAsociado[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAsociado[]>) => response.body)
      )
      .subscribe(
        (res: IAsociado[]) => {
          if (!this.editForm.get('asociado').value || !this.editForm.get('asociado').value.id) {
            this.asociados = res;
          } else {
            this.asociadoService
              .find(this.editForm.get('asociado').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IAsociado>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IAsociado>) => subResponse.body)
              )
              .subscribe(
                (subRes: IAsociado) => (this.asociados = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.dominioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDominio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDominio[]>) => response.body)
      )
      .subscribe((res: IDominio[]) => (this.dominios = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(ordenDeTrabajo: IOrdenDeTrabajo) {
    this.editForm.patchValue({
      id: ordenDeTrabajo.id,
      fechaDeRealizacion: ordenDeTrabajo.fechaDeRealizacion != null ? ordenDeTrabajo.fechaDeRealizacion.format(DATE_TIME_FORMAT) : null,
      horasEstimadas: ordenDeTrabajo.horasEstimadas,
      descripcion: ordenDeTrabajo.descripcion,
      proyecto: ordenDeTrabajo.proyecto,
      asociado: ordenDeTrabajo.asociado,
      estado: ordenDeTrabajo.estado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ordenDeTrabajo = this.createFromForm();
    if (ordenDeTrabajo.id !== undefined) {
      this.subscribeToSaveResponse(this.ordenDeTrabajoService.update(ordenDeTrabajo));
    } else {
      this.subscribeToSaveResponse(this.ordenDeTrabajoService.create(ordenDeTrabajo));
    }
  }

  private createFromForm(): IOrdenDeTrabajo {
    return {
      ...new OrdenDeTrabajo(),
      id: this.editForm.get(['id']).value,
      fechaDeRealizacion:
        this.editForm.get(['fechaDeRealizacion']).value != null
          ? moment(this.editForm.get(['fechaDeRealizacion']).value, DATE_TIME_FORMAT)
          : undefined,
      horasEstimadas: this.editForm.get(['horasEstimadas']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      proyecto: this.editForm.get(['proyecto']).value,
      asociado: this.editForm.get(['asociado']).value,
      estado: this.editForm.get(['estado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrdenDeTrabajo>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProyectoById(index: number, item: IProyecto) {
    return item.id;
  }

  trackAsociadoById(index: number, item: IAsociado) {
    return item.id;
  }

  trackDominioById(index: number, item: IDominio) {
    return item.id;
  }
}
