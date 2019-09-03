import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDominio } from 'app/shared/model/dominio.model';
import { AccountService } from 'app/core';
import { DominioService } from './dominio.service';

@Component({
  selector: 'jhi-dominio',
  templateUrl: './dominio.component.html'
})
export class DominioComponent implements OnInit, OnDestroy {
  dominios: IDominio[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected dominioService: DominioService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.dominioService
      .query()
      .pipe(
        filter((res: HttpResponse<IDominio[]>) => res.ok),
        map((res: HttpResponse<IDominio[]>) => res.body)
      )
      .subscribe(
        (res: IDominio[]) => {
          this.dominios = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDominios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDominio) {
    return item.id;
  }

  registerChangeInDominios() {
    this.eventSubscriber = this.eventManager.subscribe('dominioListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
