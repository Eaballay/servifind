import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IOrdenDeCompra, OrdenDeCompra } from 'app/shared/model/orden-de-compra.model';
import { OrdenDeCompraService } from './orden-de-compra.service';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { PresupuestoService } from 'app/entities/presupuesto';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado';
import { IDominio } from 'app/shared/model/dominio.model';
import { DominioService } from 'app/entities/dominio';

@Component({
  selector: 'jhi-orden-de-compra-update',
  templateUrl: './orden-de-compra-update.component.html'
})
export class OrdenDeCompraUpdateComponent implements OnInit {
  isSaving: boolean;

  presupuestos: IPresupuesto[];

  empleados: IEmpleado[];

  estados: IDominio[];

  editForm = this.fb.group({
    id: [],
    nroOrdenDeCompra: [null, [Validators.required]],
    fechaDeCreacion: [null, [Validators.required]],
    presupuesto: [],
    empleado: [],
    estado: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ordenDeCompraService: OrdenDeCompraService,
    protected presupuestoService: PresupuestoService,
    protected empleadoService: EmpleadoService,
    protected dominioService: DominioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ordenDeCompra }) => {
      this.updateForm(ordenDeCompra);
    });
    this.presupuestoService
      .query({ filter: 'ordendecompra-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPresupuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPresupuesto[]>) => response.body)
      )
      .subscribe(
        (res: IPresupuesto[]) => {
          if (!this.editForm.get('presupuesto').value || !this.editForm.get('presupuesto').value.id) {
            this.presupuestos = res;
          } else {
            this.presupuestoService
              .find(this.editForm.get('presupuesto').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPresupuesto>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPresupuesto>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPresupuesto) => (this.presupuestos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.empleadoService
      .query({ filter: 'ordendecompra-is-null' })
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
      .query({ filter: 'ordendecompra-is-null' })
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

  updateForm(ordenDeCompra: IOrdenDeCompra) {
    this.editForm.patchValue({
      id: ordenDeCompra.id,
      nroOrdenDeCompra: ordenDeCompra.nroOrdenDeCompra,
      fechaDeCreacion: ordenDeCompra.fechaDeCreacion != null ? ordenDeCompra.fechaDeCreacion.format(DATE_TIME_FORMAT) : null,
      presupuesto: ordenDeCompra.presupuesto,
      empleado: ordenDeCompra.empleado,
      estado: ordenDeCompra.estado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ordenDeCompra = this.createFromForm();
    if (ordenDeCompra.id !== undefined) {
      this.subscribeToSaveResponse(this.ordenDeCompraService.update(ordenDeCompra));
    } else {
      this.subscribeToSaveResponse(this.ordenDeCompraService.create(ordenDeCompra));
    }
  }

  private createFromForm(): IOrdenDeCompra {
    return {
      ...new OrdenDeCompra(),
      id: this.editForm.get(['id']).value,
      nroOrdenDeCompra: this.editForm.get(['nroOrdenDeCompra']).value,
      fechaDeCreacion:
        this.editForm.get(['fechaDeCreacion']).value != null
          ? moment(this.editForm.get(['fechaDeCreacion']).value, DATE_TIME_FORMAT)
          : undefined,
      presupuesto: this.editForm.get(['presupuesto']).value,
      empleado: this.editForm.get(['empleado']).value,
      estado: this.editForm.get(['estado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrdenDeCompra>>) {
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

  trackPresupuestoById(index: number, item: IPresupuesto) {
    return item.id;
  }

  trackEmpleadoById(index: number, item: IEmpleado) {
    return item.id;
  }

  trackDominioById(index: number, item: IDominio) {
    return item.id;
  }
}
