import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IPresupuesto, Presupuesto } from 'app/shared/model/presupuesto.model';
import { PresupuestoService } from './presupuesto.service';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado';

@Component({
  selector: 'jhi-presupuesto-update',
  templateUrl: './presupuesto-update.component.html'
})
export class PresupuestoUpdateComponent implements OnInit {
  isSaving: boolean;

  empleados: IEmpleado[];

  editForm = this.fb.group({
    id: [],
    fechaDeCreacion: [null, [Validators.required]],
    fechaDeVencimiento: [null, [Validators.required]],
    empleado: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected presupuestoService: PresupuestoService,
    protected empleadoService: EmpleadoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ presupuesto }) => {
      this.updateForm(presupuesto);
    });
    this.empleadoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmpleado[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmpleado[]>) => response.body)
      )
      .subscribe((res: IEmpleado[]) => (this.empleados = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(presupuesto: IPresupuesto) {
    this.editForm.patchValue({
      id: presupuesto.id,
      fechaDeCreacion: presupuesto.fechaDeCreacion != null ? presupuesto.fechaDeCreacion.format(DATE_TIME_FORMAT) : null,
      fechaDeVencimiento: presupuesto.fechaDeVencimiento != null ? presupuesto.fechaDeVencimiento.format(DATE_TIME_FORMAT) : null,
      empleado: presupuesto.empleado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const presupuesto = this.createFromForm();
    if (presupuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.presupuestoService.update(presupuesto));
    } else {
      this.subscribeToSaveResponse(this.presupuestoService.create(presupuesto));
    }
  }

  private createFromForm(): IPresupuesto {
    return {
      ...new Presupuesto(),
      id: this.editForm.get(['id']).value,
      fechaDeCreacion:
        this.editForm.get(['fechaDeCreacion']).value != null
          ? moment(this.editForm.get(['fechaDeCreacion']).value, DATE_TIME_FORMAT)
          : undefined,
      fechaDeVencimiento:
        this.editForm.get(['fechaDeVencimiento']).value != null
          ? moment(this.editForm.get(['fechaDeVencimiento']).value, DATE_TIME_FORMAT)
          : undefined,
      empleado: this.editForm.get(['empleado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPresupuesto>>) {
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

  trackEmpleadoById(index: number, item: IEmpleado) {
    return item.id;
  }
}
