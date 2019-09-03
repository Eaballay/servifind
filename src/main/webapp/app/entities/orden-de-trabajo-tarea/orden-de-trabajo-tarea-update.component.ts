import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IOrdenDeTrabajoTarea, OrdenDeTrabajoTarea } from 'app/shared/model/orden-de-trabajo-tarea.model';
import { OrdenDeTrabajoTareaService } from './orden-de-trabajo-tarea.service';
import { IOrdenDeTrabajo } from 'app/shared/model/orden-de-trabajo.model';
import { OrdenDeTrabajoService } from 'app/entities/orden-de-trabajo';
import { IDominio } from 'app/shared/model/dominio.model';
import { DominioService } from 'app/entities/dominio';

@Component({
  selector: 'jhi-orden-de-trabajo-tarea-update',
  templateUrl: './orden-de-trabajo-tarea-update.component.html'
})
export class OrdenDeTrabajoTareaUpdateComponent implements OnInit {
  isSaving: boolean;

  ordendetrabajos: IOrdenDeTrabajo[];

  unidads: IDominio[];

  editForm = this.fb.group({
    id: [],
    cantidad: [],
    precioPorUnidad: [],
    descripcion: [],
    ordenDeTrabajo: [],
    unidad: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ordenDeTrabajoTareaService: OrdenDeTrabajoTareaService,
    protected ordenDeTrabajoService: OrdenDeTrabajoService,
    protected dominioService: DominioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ordenDeTrabajoTarea }) => {
      this.updateForm(ordenDeTrabajoTarea);
    });
    this.ordenDeTrabajoService
      .query({ filter: 'ordendetrabajotarea-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IOrdenDeTrabajo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOrdenDeTrabajo[]>) => response.body)
      )
      .subscribe(
        (res: IOrdenDeTrabajo[]) => {
          if (!this.editForm.get('ordenDeTrabajo').value || !this.editForm.get('ordenDeTrabajo').value.id) {
            this.ordendetrabajos = res;
          } else {
            this.ordenDeTrabajoService
              .find(this.editForm.get('ordenDeTrabajo').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IOrdenDeTrabajo>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IOrdenDeTrabajo>) => subResponse.body)
              )
              .subscribe(
                (subRes: IOrdenDeTrabajo) => (this.ordendetrabajos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.dominioService
      .query({ filter: 'ordendetrabajotarea-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDominio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDominio[]>) => response.body)
      )
      .subscribe(
        (res: IDominio[]) => {
          if (!this.editForm.get('unidad').value || !this.editForm.get('unidad').value.id) {
            this.unidads = res;
          } else {
            this.dominioService
              .find(this.editForm.get('unidad').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDominio>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDominio>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDominio) => (this.unidads = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(ordenDeTrabajoTarea: IOrdenDeTrabajoTarea) {
    this.editForm.patchValue({
      id: ordenDeTrabajoTarea.id,
      cantidad: ordenDeTrabajoTarea.cantidad,
      precioPorUnidad: ordenDeTrabajoTarea.precioPorUnidad,
      descripcion: ordenDeTrabajoTarea.descripcion,
      ordenDeTrabajo: ordenDeTrabajoTarea.ordenDeTrabajo,
      unidad: ordenDeTrabajoTarea.unidad
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ordenDeTrabajoTarea = this.createFromForm();
    if (ordenDeTrabajoTarea.id !== undefined) {
      this.subscribeToSaveResponse(this.ordenDeTrabajoTareaService.update(ordenDeTrabajoTarea));
    } else {
      this.subscribeToSaveResponse(this.ordenDeTrabajoTareaService.create(ordenDeTrabajoTarea));
    }
  }

  private createFromForm(): IOrdenDeTrabajoTarea {
    return {
      ...new OrdenDeTrabajoTarea(),
      id: this.editForm.get(['id']).value,
      cantidad: this.editForm.get(['cantidad']).value,
      precioPorUnidad: this.editForm.get(['precioPorUnidad']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      ordenDeTrabajo: this.editForm.get(['ordenDeTrabajo']).value,
      unidad: this.editForm.get(['unidad']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrdenDeTrabajoTarea>>) {
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

  trackOrdenDeTrabajoById(index: number, item: IOrdenDeTrabajo) {
    return item.id;
  }

  trackDominioById(index: number, item: IDominio) {
    return item.id;
  }
}
