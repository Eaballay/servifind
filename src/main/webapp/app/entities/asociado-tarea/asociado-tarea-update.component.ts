import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAsociadoTarea, AsociadoTarea } from 'app/shared/model/asociado-tarea.model';
import { AsociadoTareaService } from './asociado-tarea.service';
import { IAsociado } from 'app/shared/model/asociado.model';
import { AsociadoService } from 'app/entities/asociado';
import { ITarea } from 'app/shared/model/tarea.model';
import { TareaService } from 'app/entities/tarea';

@Component({
  selector: 'jhi-asociado-tarea-update',
  templateUrl: './asociado-tarea-update.component.html'
})
export class AsociadoTareaUpdateComponent implements OnInit {
  isSaving: boolean;

  asociados: IAsociado[];

  tareas: ITarea[];

  editForm = this.fb.group({
    id: [],
    asociado: [],
    tarea: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected asociadoTareaService: AsociadoTareaService,
    protected asociadoService: AsociadoService,
    protected tareaService: TareaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ asociadoTarea }) => {
      this.updateForm(asociadoTarea);
    });
    this.asociadoService
      .query({ filter: 'asociadotarea-is-null' })
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
    this.tareaService
      .query({ filter: 'asociadotarea-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ITarea[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITarea[]>) => response.body)
      )
      .subscribe(
        (res: ITarea[]) => {
          if (!this.editForm.get('tarea').value || !this.editForm.get('tarea').value.id) {
            this.tareas = res;
          } else {
            this.tareaService
              .find(this.editForm.get('tarea').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ITarea>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ITarea>) => subResponse.body)
              )
              .subscribe(
                (subRes: ITarea) => (this.tareas = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(asociadoTarea: IAsociadoTarea) {
    this.editForm.patchValue({
      id: asociadoTarea.id,
      asociado: asociadoTarea.asociado,
      tarea: asociadoTarea.tarea
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const asociadoTarea = this.createFromForm();
    if (asociadoTarea.id !== undefined) {
      this.subscribeToSaveResponse(this.asociadoTareaService.update(asociadoTarea));
    } else {
      this.subscribeToSaveResponse(this.asociadoTareaService.create(asociadoTarea));
    }
  }

  private createFromForm(): IAsociadoTarea {
    return {
      ...new AsociadoTarea(),
      id: this.editForm.get(['id']).value,
      asociado: this.editForm.get(['asociado']).value,
      tarea: this.editForm.get(['tarea']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAsociadoTarea>>) {
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

  trackAsociadoById(index: number, item: IAsociado) {
    return item.id;
  }

  trackTareaById(index: number, item: ITarea) {
    return item.id;
  }
}
