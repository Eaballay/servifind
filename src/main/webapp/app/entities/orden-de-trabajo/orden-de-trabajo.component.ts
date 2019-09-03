import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrdenDeTrabajo } from 'app/shared/model/orden-de-trabajo.model';
import { AccountService } from 'app/core';
import { OrdenDeTrabajoService } from './orden-de-trabajo.service';

@Component({
  selector: 'jhi-orden-de-trabajo',
  templateUrl: './orden-de-trabajo.component.html'
})
export class OrdenDeTrabajoComponent implements OnInit, OnDestroy {
  ordenDeTrabajos: IOrdenDeTrabajo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected ordenDeTrabajoService: OrdenDeTrabajoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.ordenDeTrabajoService
      .query()
      .pipe(
        filter((res: HttpResponse<IOrdenDeTrabajo[]>) => res.ok),
        map((res: HttpResponse<IOrdenDeTrabajo[]>) => res.body)
      )
      .subscribe(
        (res: IOrdenDeTrabajo[]) => {
          this.ordenDeTrabajos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOrdenDeTrabajos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrdenDeTrabajo) {
    return item.id;
  }

  registerChangeInOrdenDeTrabajos() {
    this.eventSubscriber = this.eventManager.subscribe('ordenDeTrabajoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
