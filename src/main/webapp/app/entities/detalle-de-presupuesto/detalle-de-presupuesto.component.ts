import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDetalleDePresupuesto } from 'app/shared/model/detalle-de-presupuesto.model';
import { AccountService } from 'app/core';
import { DetalleDePresupuestoService } from './detalle-de-presupuesto.service';

@Component({
  selector: 'jhi-detalle-de-presupuesto',
  templateUrl: './detalle-de-presupuesto.component.html'
})
export class DetalleDePresupuestoComponent implements OnInit, OnDestroy {
  detalleDePresupuestos: IDetalleDePresupuesto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected detalleDePresupuestoService: DetalleDePresupuestoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.detalleDePresupuestoService
      .query()
      .pipe(
        filter((res: HttpResponse<IDetalleDePresupuesto[]>) => res.ok),
        map((res: HttpResponse<IDetalleDePresupuesto[]>) => res.body)
      )
      .subscribe(
        (res: IDetalleDePresupuesto[]) => {
          this.detalleDePresupuestos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDetalleDePresupuestos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDetalleDePresupuesto) {
    return item.id;
  }

  registerChangeInDetalleDePresupuestos() {
    this.eventSubscriber = this.eventManager.subscribe('detalleDePresupuestoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
