import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDetalleDePresupuesto, DetalleDePresupuesto } from 'app/shared/model/detalle-de-presupuesto.model';
import { DetalleDePresupuestoService } from './detalle-de-presupuesto.service';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { PresupuestoService } from 'app/entities/presupuesto';
import { IDominio } from 'app/shared/model/dominio.model';
import { DominioService } from 'app/entities/dominio';

@Component({
  selector: 'jhi-detalle-de-presupuesto-update',
  templateUrl: './detalle-de-presupuesto-update.component.html'
})
export class DetalleDePresupuestoUpdateComponent implements OnInit {
  isSaving: boolean;

  presupuestos: IPresupuesto[];

  unidads: IDominio[];

  editForm = this.fb.group({
    id: [],
    cantidad: [null, [Validators.required]],
    valorPorUnidad: [null, [Validators.required]],
    descripcion: [],
    presupuesto: [],
    unidad: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected detalleDePresupuestoService: DetalleDePresupuestoService,
    protected presupuestoService: PresupuestoService,
    protected dominioService: DominioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ detalleDePresupuesto }) => {
      this.updateForm(detalleDePresupuesto);
    });
    this.presupuestoService
      .query({ filter: 'detalledepresupuesto-is-null' })
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
    this.dominioService
      .query({ filter: 'detalledepresupuesto-is-null' })
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

  updateForm(detalleDePresupuesto: IDetalleDePresupuesto) {
    this.editForm.patchValue({
      id: detalleDePresupuesto.id,
      cantidad: detalleDePresupuesto.cantidad,
      valorPorUnidad: detalleDePresupuesto.valorPorUnidad,
      descripcion: detalleDePresupuesto.descripcion,
      presupuesto: detalleDePresupuesto.presupuesto,
      unidad: detalleDePresupuesto.unidad
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const detalleDePresupuesto = this.createFromForm();
    if (detalleDePresupuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.detalleDePresupuestoService.update(detalleDePresupuesto));
    } else {
      this.subscribeToSaveResponse(this.detalleDePresupuestoService.create(detalleDePresupuesto));
    }
  }

  private createFromForm(): IDetalleDePresupuesto {
    return {
      ...new DetalleDePresupuesto(),
      id: this.editForm.get(['id']).value,
      cantidad: this.editForm.get(['cantidad']).value,
      valorPorUnidad: this.editForm.get(['valorPorUnidad']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      presupuesto: this.editForm.get(['presupuesto']).value,
      unidad: this.editForm.get(['unidad']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetalleDePresupuesto>>) {
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

  trackDominioById(index: number, item: IDominio) {
    return item.id;
  }
}
