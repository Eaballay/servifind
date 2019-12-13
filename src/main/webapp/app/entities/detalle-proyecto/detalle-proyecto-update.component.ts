import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDetalleProyecto, DetalleProyecto } from 'app/shared/model/detalle-proyecto.model';
import { DetalleProyectoService } from './detalle-proyecto.service';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { ProyectoService } from 'app/entities/proyecto';
import { IDominio } from 'app/shared/model/dominio.model';
import { DominioService } from 'app/entities/dominio';

@Component({
  selector: 'jhi-detalle-proyecto-update',
  templateUrl: './detalle-proyecto-update.component.html'
})
export class DetalleProyectoUpdateComponent implements OnInit {
  isSaving: boolean;

  proyectos: IProyecto[];

  rubros: IDominio[];

  dimensions: IDominio[];

  tipodetareas: IDominio[];

  editForm = this.fb.group({
    id: [],
    proyecto: [],
    rubro: [],
    dimension: [],
    tipoDeTarea: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected detalleProyectoService: DetalleProyectoService,
    protected proyectoService: ProyectoService,
    protected dominioService: DominioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ detalleProyecto }) => {
      this.updateForm(detalleProyecto);
    });
    this.proyectoService
      .query({ filter: 'detalleproyecto-is-null' })
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
      .query({ filter: 'detalleproyecto-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDominio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDominio[]>) => response.body)
      )
      .subscribe(
        (res: IDominio[]) => {
          if (!this.editForm.get('rubro').value || !this.editForm.get('rubro').value.id) {
            this.rubros = res;
          } else {
            this.dominioService
              .find(this.editForm.get('rubro').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDominio>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDominio>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDominio) => (this.rubros = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.dominioService
      .query({ filter: 'detalleproyecto-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDominio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDominio[]>) => response.body)
      )
      .subscribe(
        (res: IDominio[]) => {
          if (!this.editForm.get('dimension').value || !this.editForm.get('dimension').value.id) {
            this.dimensions = res;
          } else {
            this.dominioService
              .find(this.editForm.get('dimension').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDominio>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDominio>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDominio) => (this.dimensions = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.dominioService
      .query({ filter: 'detalleproyecto-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDominio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDominio[]>) => response.body)
      )
      .subscribe(
        (res: IDominio[]) => {
          if (!this.editForm.get('tipoDeTarea').value || !this.editForm.get('tipoDeTarea').value.id) {
            this.tipodetareas = res;
          } else {
            this.dominioService
              .find(this.editForm.get('tipoDeTarea').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDominio>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDominio>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDominio) => (this.tipodetareas = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(detalleProyecto: IDetalleProyecto) {
    this.editForm.patchValue({
      id: detalleProyecto.id,
      proyecto: detalleProyecto.proyecto,
      rubro: detalleProyecto.rubro,
      dimension: detalleProyecto.dimension,
      tipoDeTarea: detalleProyecto.tipoDeTarea
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const detalleProyecto = this.createFromForm();
    if (detalleProyecto.id !== undefined) {
      this.subscribeToSaveResponse(this.detalleProyectoService.update(detalleProyecto));
    } else {
      this.subscribeToSaveResponse(this.detalleProyectoService.create(detalleProyecto));
    }
  }

  private createFromForm(): IDetalleProyecto {
    return {
      ...new DetalleProyecto(),
      id: this.editForm.get(['id']).value,
      proyecto: this.editForm.get(['proyecto']).value,
      rubro: this.editForm.get(['rubro']).value,
      dimension: this.editForm.get(['dimension']).value,
      tipoDeTarea: this.editForm.get(['tipoDeTarea']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetalleProyecto>>) {
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
