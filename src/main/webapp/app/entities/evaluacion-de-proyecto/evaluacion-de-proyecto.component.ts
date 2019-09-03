import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEvaluacionDeProyecto } from 'app/shared/model/evaluacion-de-proyecto.model';
import { AccountService } from 'app/core';
import { EvaluacionDeProyectoService } from './evaluacion-de-proyecto.service';

@Component({
  selector: 'jhi-evaluacion-de-proyecto',
  templateUrl: './evaluacion-de-proyecto.component.html'
})
export class EvaluacionDeProyectoComponent implements OnInit, OnDestroy {
  evaluacionDeProyectos: IEvaluacionDeProyecto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected evaluacionDeProyectoService: EvaluacionDeProyectoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.evaluacionDeProyectoService
      .query()
      .pipe(
        filter((res: HttpResponse<IEvaluacionDeProyecto[]>) => res.ok),
        map((res: HttpResponse<IEvaluacionDeProyecto[]>) => res.body)
      )
      .subscribe(
        (res: IEvaluacionDeProyecto[]) => {
          this.evaluacionDeProyectos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEvaluacionDeProyectos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEvaluacionDeProyecto) {
    return item.id;
  }

  registerChangeInEvaluacionDeProyectos() {
    this.eventSubscriber = this.eventManager.subscribe('evaluacionDeProyectoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
