import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDetalleProyecto } from 'app/shared/model/detalle-proyecto.model';
import { AccountService } from 'app/core';
import { DetalleProyectoService } from './detalle-proyecto.service';

@Component({
  selector: 'jhi-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html'
})
export class DetalleProyectoComponent implements OnInit, OnDestroy {
  detalleProyectos: IDetalleProyecto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected detalleProyectoService: DetalleProyectoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.detalleProyectoService
      .query()
      .pipe(
        filter((res: HttpResponse<IDetalleProyecto[]>) => res.ok),
        map((res: HttpResponse<IDetalleProyecto[]>) => res.body)
      )
      .subscribe(
        (res: IDetalleProyecto[]) => {
          this.detalleProyectos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDetalleProyectos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDetalleProyecto) {
    return item.id;
  }

  registerChangeInDetalleProyectos() {
    this.eventSubscriber = this.eventManager.subscribe('detalleProyectoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
