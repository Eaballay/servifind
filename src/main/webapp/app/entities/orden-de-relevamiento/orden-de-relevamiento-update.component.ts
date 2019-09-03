import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IOrdenDeRelevamiento, OrdenDeRelevamiento } from 'app/shared/model/orden-de-relevamiento.model';
import { OrdenDeRelevamientoService } from './orden-de-relevamiento.service';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { ProyectoService } from 'app/entities/proyecto';
import { IDominio } from 'app/shared/model/dominio.model';
import { DominioService } from 'app/entities/dominio';

@Component({
  selector: 'jhi-orden-de-relevamiento-update',
  templateUrl: './orden-de-relevamiento-update.component.html'
})
export class OrdenDeRelevamientoUpdateComponent implements OnInit {
  isSaving: boolean;

  proyectos: IProyecto[];

  estados: IDominio[];

  editForm = this.fb.group({
    id: [],
    comentario: [],
    fecha: [null, [Validators.required]],
    hora: [null, [Validators.required]],
    proyecto: [],
    estado: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ordenDeRelevamientoService: OrdenDeRelevamientoService,
    protected proyectoService: ProyectoService,
    protected dominioService: DominioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ordenDeRelevamiento }) => {
      this.updateForm(ordenDeRelevamiento);
    });
    this.proyectoService
      .query({ filter: 'ordenderelevamiento-is-null' })
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
    this.dominioService
      .query({ filter: 'ordenderelevamiento-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDominio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDominio[]>) => response.body)
      )
      .subscribe(
        (res: IDominio[]) => {
          if (!this.editForm.get('estado').value || !this.editForm.get('estado').value.id) {
            this.estados = res;
          } else {
            this.dominioService
              .find(this.editForm.get('estado').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDominio>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDominio>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDominio) => (this.estados = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(ordenDeRelevamiento: IOrdenDeRelevamiento) {
    this.editForm.patchValue({
      id: ordenDeRelevamiento.id,
      comentario: ordenDeRelevamiento.comentario,
      fecha: ordenDeRelevamiento.fecha != null ? ordenDeRelevamiento.fecha.format(DATE_TIME_FORMAT) : null,
      hora: ordenDeRelevamiento.hora != null ? ordenDeRelevamiento.hora.format(DATE_TIME_FORMAT) : null,
      proyecto: ordenDeRelevamiento.proyecto,
      estado: ordenDeRelevamiento.estado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ordenDeRelevamiento = this.createFromForm();
    if (ordenDeRelevamiento.id !== undefined) {
      this.subscribeToSaveResponse(this.ordenDeRelevamientoService.update(ordenDeRelevamiento));
    } else {
      this.subscribeToSaveResponse(this.ordenDeRelevamientoService.create(ordenDeRelevamiento));
    }
  }

  private createFromForm(): IOrdenDeRelevamiento {
    return {
      ...new OrdenDeRelevamiento(),
      id: this.editForm.get(['id']).value,
      comentario: this.editForm.get(['comentario']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      hora: this.editForm.get(['hora']).value != null ? moment(this.editForm.get(['hora']).value, DATE_TIME_FORMAT) : undefined,
      proyecto: this.editForm.get(['proyecto']).value,
      estado: this.editForm.get(['estado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrdenDeRelevamiento>>) {
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

  trackDominioById(index: number, item: IDominio) {
    return item.id;
  }
}
