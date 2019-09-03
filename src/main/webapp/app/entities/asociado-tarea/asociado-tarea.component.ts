import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAsociadoTarea } from 'app/shared/model/asociado-tarea.model';
import { AccountService } from 'app/core';
import { AsociadoTareaService } from './asociado-tarea.service';

@Component({
  selector: 'jhi-asociado-tarea',
  templateUrl: './asociado-tarea.component.html'
})
export class AsociadoTareaComponent implements OnInit, OnDestroy {
  asociadoTareas: IAsociadoTarea[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected asociadoTareaService: AsociadoTareaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.asociadoTareaService
      .query()
      .pipe(
        filter((res: HttpResponse<IAsociadoTarea[]>) => res.ok),
        map((res: HttpResponse<IAsociadoTarea[]>) => res.body)
      )
      .subscribe(
        (res: IAsociadoTarea[]) => {
          this.asociadoTareas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAsociadoTareas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAsociadoTarea) {
    return item.id;
  }

  registerChangeInAsociadoTareas() {
    this.eventSubscriber = this.eventManager.subscribe('asociadoTareaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
