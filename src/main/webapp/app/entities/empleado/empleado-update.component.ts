import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IEmpleado, Empleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from './empleado.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona';

@Component({
  selector: 'jhi-empleado-update',
  templateUrl: './empleado-update.component.html'
})
export class EmpleadoUpdateComponent implements OnInit {
  isSaving: boolean;

  personas: IPersona[];

  editForm = this.fb.group({
    id: [],
    fechaDeContratacion: [null, [Validators.required]],
    nroDeLegajo: [null, [Validators.required]],
    persona: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected empleadoService: EmpleadoService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ empleado }) => {
      this.updateForm(empleado);
    });
    this.personaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPersona[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPersona[]>) => response.body)
      )
      .subscribe((res: IPersona[]) => (this.personas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(empleado: IEmpleado) {
    this.editForm.patchValue({
      id: empleado.id,
      fechaDeContratacion: empleado.fechaDeContratacion != null ? empleado.fechaDeContratacion.format(DATE_TIME_FORMAT) : null,
      nroDeLegajo: empleado.nroDeLegajo,
      persona: empleado.persona
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const empleado = this.createFromForm();
    if (empleado.id !== undefined) {
      this.subscribeToSaveResponse(this.empleadoService.update(empleado));
    } else {
      this.subscribeToSaveResponse(this.empleadoService.create(empleado));
    }
  }

  private createFromForm(): IEmpleado {
    return {
      ...new Empleado(),
      id: this.editForm.get(['id']).value,
      fechaDeContratacion:
        this.editForm.get(['fechaDeContratacion']).value != null
          ? moment(this.editForm.get(['fechaDeContratacion']).value, DATE_TIME_FORMAT)
          : undefined,
      nroDeLegajo: this.editForm.get(['nroDeLegajo']).value,
      persona: this.editForm.get(['persona']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpleado>>) {
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

  trackPersonaById(index: number, item: IPersona) {
    return item.id;
  }
}
