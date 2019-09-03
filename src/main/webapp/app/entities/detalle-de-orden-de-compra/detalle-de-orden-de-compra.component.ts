import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDetalleDeOrdenDeCompra } from 'app/shared/model/detalle-de-orden-de-compra.model';
import { AccountService } from 'app/core';
import { DetalleDeOrdenDeCompraService } from './detalle-de-orden-de-compra.service';

@Component({
  selector: 'jhi-detalle-de-orden-de-compra',
  templateUrl: './detalle-de-orden-de-compra.component.html'
})
export class DetalleDeOrdenDeCompraComponent implements OnInit, OnDestroy {
  detalleDeOrdenDeCompras: IDetalleDeOrdenDeCompra[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected detalleDeOrdenDeCompraService: DetalleDeOrdenDeCompraService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.detalleDeOrdenDeCompraService
      .query()
      .pipe(
        filter((res: HttpResponse<IDetalleDeOrdenDeCompra[]>) => res.ok),
        map((res: HttpResponse<IDetalleDeOrdenDeCompra[]>) => res.body)
      )
      .subscribe(
        (res: IDetalleDeOrdenDeCompra[]) => {
          this.detalleDeOrdenDeCompras = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDetalleDeOrdenDeCompras();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDetalleDeOrdenDeCompra) {
    return item.id;
  }

  registerChangeInDetalleDeOrdenDeCompras() {
    this.eventSubscriber = this.eventManager.subscribe('detalleDeOrdenDeCompraListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
