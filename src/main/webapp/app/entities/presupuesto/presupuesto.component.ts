import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { AccountService } from 'app/core';
import { PresupuestoService } from './presupuesto.service';

@Component({
  selector: 'jhi-presupuesto',
  templateUrl: './presupuesto.component.html'
})
export class PresupuestoComponent implements OnInit, OnDestroy {
  presupuestos: IPresupuesto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected presupuestoService: PresupuestoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.presupuestoService
      .query()
      .pipe(
        filter((res: HttpResponse<IPresupuesto[]>) => res.ok),
        map((res: HttpResponse<IPresupuesto[]>) => res.body)
      )
      .subscribe(
        (res: IPresupuesto[]) => {
          this.presupuestos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPresupuestos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPresupuesto) {
    return item.id;
  }

  registerChangeInPresupuestos() {
    this.eventSubscriber = this.eventManager.subscribe('presupuestoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
