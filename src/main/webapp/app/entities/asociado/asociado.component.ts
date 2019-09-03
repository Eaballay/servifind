import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAsociado } from 'app/shared/model/asociado.model';
import { AccountService } from 'app/core';
import { AsociadoService } from './asociado.service';

@Component({
  selector: 'jhi-asociado',
  templateUrl: './asociado.component.html'
})
export class AsociadoComponent implements OnInit, OnDestroy {
  asociados: IAsociado[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected asociadoService: AsociadoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.asociadoService
      .query()
      .pipe(
        filter((res: HttpResponse<IAsociado[]>) => res.ok),
        map((res: HttpResponse<IAsociado[]>) => res.body)
      )
      .subscribe(
        (res: IAsociado[]) => {
          this.asociados = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAsociados();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAsociado) {
    return item.id;
  }

  registerChangeInAsociados() {
    this.eventSubscriber = this.eventManager.subscribe('asociadoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
