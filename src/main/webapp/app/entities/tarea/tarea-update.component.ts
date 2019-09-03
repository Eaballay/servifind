import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITarea, Tarea } from 'app/shared/model/tarea.model';
import { TareaService } from './tarea.service';
import { IDominio } from 'app/shared/model/dominio.model';
import { DominioService } from 'app/entities/dominio';

@Component({
  selector: 'jhi-tarea-update',
  templateUrl: './tarea-update.component.html'
})
export class TareaUpdateComponent implements OnInit {
  isSaving: boolean;

  actividads: IDominio[];

  unidads: IDominio[];

  estados: IDominio[];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: [null, [Validators.required]],
    precioPorUnidad: [null, [Validators.required]],
    fechaDeCreacion: [null, [Validators.required]],
    fechaDeModificacion: [null, [Validators.required]],
    actividad: [],
    unidad: [],
    estado: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tareaService: TareaService,
    protected dominioService: DominioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tarea }) => {
      this.updateForm(tarea);
    });
    this.dominioService
      .query({ filter: 'tarea-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDominio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDominio[]>) => response.body)
      )
      .subscribe(
        (res: IDominio[]) => {
          if (!this.editForm.get('actividad').value || !this.editForm.get('actividad').value.id) {
            this.actividads = res;
          } else {
            this.dominioService
              .find(this.editForm.get('actividad').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDominio>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDominio>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDominio) => (this.actividads = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.dominioService
      .query({ filter: 'tarea-is-null' })
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
    this.dominioService
      .query({ filter: 'tarea-is-null' })
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

  updateForm(tarea: ITarea) {
    this.editForm.patchValue({
      id: tarea.id,
      nombre: tarea.nombre,
      descripcion: tarea.descripcion,
      precioPorUnidad: tarea.precioPorUnidad,
      fechaDeCreacion: tarea.fechaDeCreacion != null ? tarea.fechaDeCreacion.format(DATE_TIME_FORMAT) : null,
      fechaDeModificacion: tarea.fechaDeModificacion != null ? tarea.fechaDeModificacion.format(DATE_TIME_FORMAT) : null,
      actividad: tarea.actividad,
      unidad: tarea.unidad,
      estado: tarea.estado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tarea = this.createFromForm();
    if (tarea.id !== undefined) {
      this.subscribeToSaveResponse(this.tareaService.update(tarea));
    } else {
      this.subscribeToSaveResponse(this.tareaService.create(tarea));
    }
  }

  private createFromForm(): ITarea {
    return {
      ...new Tarea(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      precioPorUnidad: this.editForm.get(['precioPorUnidad']).value,
      fechaDeCreacion:
        this.editForm.get(['fechaDeCreacion']).value != null
          ? moment(this.editForm.get(['fechaDeCreacion']).value, DATE_TIME_FORMAT)
          : undefined,
      fechaDeModificacion:
        this.editForm.get(['fechaDeModificacion']).value != null
          ? moment(this.editForm.get(['fechaDeModificacion']).value, DATE_TIME_FORMAT)
          : undefined,
      actividad: this.editForm.get(['actividad']).value,
      unidad: this.editForm.get(['unidad']).value,
      estado: this.editForm.get(['estado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITarea>>) {
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

  trackDominioById(index: number, item: IDominio) {
    return item.id;
  }
}
