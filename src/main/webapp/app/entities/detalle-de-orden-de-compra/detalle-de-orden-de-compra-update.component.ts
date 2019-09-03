import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDetalleDeOrdenDeCompra, DetalleDeOrdenDeCompra } from 'app/shared/model/detalle-de-orden-de-compra.model';
import { DetalleDeOrdenDeCompraService } from './detalle-de-orden-de-compra.service';
import { IOrdenDeCompra } from 'app/shared/model/orden-de-compra.model';
import { OrdenDeCompraService } from 'app/entities/orden-de-compra';
import { IDominio } from 'app/shared/model/dominio.model';
import { DominioService } from 'app/entities/dominio';

@Component({
  selector: 'jhi-detalle-de-orden-de-compra-update',
  templateUrl: './detalle-de-orden-de-compra-update.component.html'
})
export class DetalleDeOrdenDeCompraUpdateComponent implements OnInit {
  isSaving: boolean;

  ordendecompras: IOrdenDeCompra[];

  unidads: IDominio[];

  editForm = this.fb.group({
    id: [],
    cantidad: [null, [Validators.required]],
    descripcion: [null, [Validators.required]],
    ordenDeCompra: [],
    unidad: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected detalleDeOrdenDeCompraService: DetalleDeOrdenDeCompraService,
    protected ordenDeCompraService: OrdenDeCompraService,
    protected dominioService: DominioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ detalleDeOrdenDeCompra }) => {
      this.updateForm(detalleDeOrdenDeCompra);
    });
    this.ordenDeCompraService
      .query({ filter: 'detalledeordendecompra-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IOrdenDeCompra[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOrdenDeCompra[]>) => response.body)
      )
      .subscribe(
        (res: IOrdenDeCompra[]) => {
          if (!this.editForm.get('ordenDeCompra').value || !this.editForm.get('ordenDeCompra').value.id) {
            this.ordendecompras = res;
          } else {
            this.ordenDeCompraService
              .find(this.editForm.get('ordenDeCompra').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IOrdenDeCompra>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IOrdenDeCompra>) => subResponse.body)
              )
              .subscribe(
                (subRes: IOrdenDeCompra) => (this.ordendecompras = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.dominioService
      .query({ filter: 'detalledeordendecompra-is-null' })
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

  updateForm(detalleDeOrdenDeCompra: IDetalleDeOrdenDeCompra) {
    this.editForm.patchValue({
      id: detalleDeOrdenDeCompra.id,
      cantidad: detalleDeOrdenDeCompra.cantidad,
      descripcion: detalleDeOrdenDeCompra.descripcion,
      ordenDeCompra: detalleDeOrdenDeCompra.ordenDeCompra,
      unidad: detalleDeOrdenDeCompra.unidad
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const detalleDeOrdenDeCompra = this.createFromForm();
    if (detalleDeOrdenDeCompra.id !== undefined) {
      this.subscribeToSaveResponse(this.detalleDeOrdenDeCompraService.update(detalleDeOrdenDeCompra));
    } else {
      this.subscribeToSaveResponse(this.detalleDeOrdenDeCompraService.create(detalleDeOrdenDeCompra));
    }
  }

  private createFromForm(): IDetalleDeOrdenDeCompra {
    return {
      ...new DetalleDeOrdenDeCompra(),
      id: this.editForm.get(['id']).value,
      cantidad: this.editForm.get(['cantidad']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      ordenDeCompra: this.editForm.get(['ordenDeCompra']).value,
      unidad: this.editForm.get(['unidad']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetalleDeOrdenDeCompra>>) {
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

  trackOrdenDeCompraById(index: number, item: IOrdenDeCompra) {
    return item.id;
  }

  trackDominioById(index: number, item: IDominio) {
    return item.id;
  }
}
