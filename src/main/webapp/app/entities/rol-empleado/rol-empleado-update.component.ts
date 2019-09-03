import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRolEmpleado, RolEmpleado } from 'app/shared/model/rol-empleado.model';
import { RolEmpleadoService } from './rol-empleado.service';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado';
import { IDominio } from 'app/shared/model/dominio.model';
import { DominioService } from 'app/entities/dominio';

@Component({
  selector: 'jhi-rol-empleado-update',
  templateUrl: './rol-empleado-update.component.html'
})
export class RolEmpleadoUpdateComponent implements OnInit {
  isSaving: boolean;

  empleados: IEmpleado[];

  rols: IDominio[];

  editForm = this.fb.group({
    id: [],
    empleado: [],
    rol: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rolEmpleadoService: RolEmpleadoService,
    protected empleadoService: EmpleadoService,
    protected dominioService: DominioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rolEmpleado }) => {
      this.updateForm(rolEmpleado);
    });
    this.empleadoService
      .query({ filter: 'rolempleado-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IEmpleado[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmpleado[]>) => response.body)
      )
      .subscribe(
        (res: IEmpleado[]) => {
          if (!this.editForm.get('empleado').value || !this.editForm.get('empleado').value.id) {
            this.empleados = res;
          } else {
            this.empleadoService
              .find(this.editForm.get('empleado').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IEmpleado>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IEmpleado>) => subResponse.body)
              )
              .subscribe(
                (subRes: IEmpleado) => (this.empleados = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.dominioService
      .query({ filter: 'rolempleado-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDominio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDominio[]>) => response.body)
      )
      .subscribe(
        (res: IDominio[]) => {
          if (!this.editForm.get('rol').value || !this.editForm.get('rol').value.id) {
            this.rols = res;
          } else {
            this.dominioService
              .find(this.editForm.get('rol').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDominio>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDominio>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDominio) => (this.rols = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(rolEmpleado: IRolEmpleado) {
    this.editForm.patchValue({
      id: rolEmpleado.id,
      empleado: rolEmpleado.empleado,
      rol: rolEmpleado.rol
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rolEmpleado = this.createFromForm();
    if (rolEmpleado.id !== undefined) {
      this.subscribeToSaveResponse(this.rolEmpleadoService.update(rolEmpleado));
    } else {
      this.subscribeToSaveResponse(this.rolEmpleadoService.create(rolEmpleado));
    }
  }

  private createFromForm(): IRolEmpleado {
    return {
      ...new RolEmpleado(),
      id: this.editForm.get(['id']).value,
      empleado: this.editForm.get(['empleado']).value,
      rol: this.editForm.get(['rol']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRolEmpleado>>) {
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

  trackDominioById(index: number, item: IDominio) {
    return item.id;
  }
}
