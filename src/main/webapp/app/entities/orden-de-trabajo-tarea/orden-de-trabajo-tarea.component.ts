import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrdenDeTrabajoTarea } from 'app/shared/model/orden-de-trabajo-tarea.model';
import { AccountService } from 'app/core';
import { OrdenDeTrabajoTareaService } from './orden-de-trabajo-tarea.service';

@Component({
  selector: 'jhi-orden-de-trabajo-tarea',
  templateUrl: './orden-de-trabajo-tarea.component.html'
})
export class OrdenDeTrabajoTareaComponent implements OnInit, OnDestroy {
  ordenDeTrabajoTareas: IOrdenDeTrabajoTarea[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected ordenDeTrabajoTareaService: OrdenDeTrabajoTareaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.ordenDeTrabajoTareaService
      .query()
      .pipe(
        filter((res: HttpResponse<IOrdenDeTrabajoTarea[]>) => res.ok),
        map((res: HttpResponse<IOrdenDeTrabajoTarea[]>) => res.body)
      )
      .subscribe(
        (res: IOrdenDeTrabajoTarea[]) => {
          this.ordenDeTrabajoTareas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOrdenDeTrabajoTareas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrdenDeTrabajoTarea) {
    return item.id;
  }

  registerChangeInOrdenDeTrabajoTareas() {
    this.eventSubscriber = this.eventManager.subscribe('ordenDeTrabajoTareaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
