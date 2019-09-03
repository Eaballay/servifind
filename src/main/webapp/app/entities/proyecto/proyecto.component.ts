import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProyecto } from 'app/shared/model/proyecto.model';
import { AccountService } from 'app/core';
import { ProyectoService } from './proyecto.service';

@Component({
  selector: 'jhi-proyecto',
  templateUrl: './proyecto.component.html'
})
export class ProyectoComponent implements OnInit, OnDestroy {
  proyectos: IProyecto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected proyectoService: ProyectoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.proyectoService
      .query()
      .pipe(
        filter((res: HttpResponse<IProyecto[]>) => res.ok),
        map((res: HttpResponse<IProyecto[]>) => res.body)
      )
      .subscribe(
        (res: IProyecto[]) => {
          this.proyectos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInProyectos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProyecto) {
    return item.id;
  }

  registerChangeInProyectos() {
    this.eventSubscriber = this.eventManager.subscribe('proyectoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
