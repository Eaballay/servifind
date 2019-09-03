import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IEvaluacionDeProyecto, EvaluacionDeProyecto } from 'app/shared/model/evaluacion-de-proyecto.model';
import { EvaluacionDeProyectoService } from './evaluacion-de-proyecto.service';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { ProyectoService } from 'app/entities/proyecto';

@Component({
  selector: 'jhi-evaluacion-de-proyecto-update',
  templateUrl: './evaluacion-de-proyecto-update.component.html'
})
export class EvaluacionDeProyectoUpdateComponent implements OnInit {
  isSaving: boolean;

  proyectos: IProyecto[];

  editForm = this.fb.group({
    id: [],
    comentario: [],
    calificacion: [],
    fechaDeCreacion: [],
    proyecto: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected evaluacionDeProyectoService: EvaluacionDeProyectoService,
    protected proyectoService: ProyectoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ evaluacionDeProyecto }) => {
      this.updateForm(evaluacionDeProyecto);
    });
    this.proyectoService
      .query({ filter: 'evaluaciondeproyecto-is-null' })
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
  }

  updateForm(evaluacionDeProyecto: IEvaluacionDeProyecto) {
    this.editForm.patchValue({
      id: evaluacionDeProyecto.id,
      comentario: evaluacionDeProyecto.comentario,
      calificacion: evaluacionDeProyecto.calificacion,
      fechaDeCreacion: evaluacionDeProyecto.fechaDeCreacion != null ? evaluacionDeProyecto.fechaDeCreacion.format(DATE_TIME_FORMAT) : null,
      proyecto: evaluacionDeProyecto.proyecto
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const evaluacionDeProyecto = this.createFromForm();
    if (evaluacionDeProyecto.id !== undefined) {
      this.subscribeToSaveResponse(this.evaluacionDeProyectoService.update(evaluacionDeProyecto));
    } else {
      this.subscribeToSaveResponse(this.evaluacionDeProyectoService.create(evaluacionDeProyecto));
    }
  }

  private createFromForm(): IEvaluacionDeProyecto {
    return {
      ...new EvaluacionDeProyecto(),
      id: this.editForm.get(['id']).value,
      comentario: this.editForm.get(['comentario']).value,
      calificacion: this.editForm.get(['calificacion']).value,
      fechaDeCreacion:
        this.editForm.get(['fechaDeCreacion']).value != null
          ? moment(this.editForm.get(['fechaDeCreacion']).value, DATE_TIME_FORMAT)
          : undefined,
      proyecto: this.editForm.get(['proyecto']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvaluacionDeProyecto>>) {
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
}
