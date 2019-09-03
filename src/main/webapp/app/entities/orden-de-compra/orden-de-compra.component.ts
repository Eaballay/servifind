import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrdenDeCompra } from 'app/shared/model/orden-de-compra.model';
import { AccountService } from 'app/core';
import { OrdenDeCompraService } from './orden-de-compra.service';

@Component({
  selector: 'jhi-orden-de-compra',
  templateUrl: './orden-de-compra.component.html'
})
export class OrdenDeCompraComponent implements OnInit, OnDestroy {
  ordenDeCompras: IOrdenDeCompra[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected ordenDeCompraService: OrdenDeCompraService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.ordenDeCompraService
      .query()
      .pipe(
        filter((res: HttpResponse<IOrdenDeCompra[]>) => res.ok),
        map((res: HttpResponse<IOrdenDeCompra[]>) => res.body)
      )
      .subscribe(
        (res: IOrdenDeCompra[]) => {
          this.ordenDeCompras = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOrdenDeCompras();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrdenDeCompra) {
    return item.id;
  }

  registerChangeInOrdenDeCompras() {
    this.eventSubscriber = this.eventManager.subscribe('ordenDeCompraListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
