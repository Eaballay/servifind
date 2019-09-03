import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrdenDeRelevamiento } from 'app/shared/model/orden-de-relevamiento.model';
import { AccountService } from 'app/core';
import { OrdenDeRelevamientoService } from './orden-de-relevamiento.service';

@Component({
  selector: 'jhi-orden-de-relevamiento',
  templateUrl: './orden-de-relevamiento.component.html'
})
export class OrdenDeRelevamientoComponent implements OnInit, OnDestroy {
  ordenDeRelevamientos: IOrdenDeRelevamiento[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected ordenDeRelevamientoService: OrdenDeRelevamientoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.ordenDeRelevamientoService
      .query()
      .pipe(
        filter((res: HttpResponse<IOrdenDeRelevamiento[]>) => res.ok),
        map((res: HttpResponse<IOrdenDeRelevamiento[]>) => res.body)
      )
      .subscribe(
        (res: IOrdenDeRelevamiento[]) => {
          this.ordenDeRelevamientos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOrdenDeRelevamientos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrdenDeRelevamiento) {
    return item.id;
  }

  registerChangeInOrdenDeRelevamientos() {
    this.eventSubscriber = this.eventManager.subscribe('ordenDeRelevamientoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
