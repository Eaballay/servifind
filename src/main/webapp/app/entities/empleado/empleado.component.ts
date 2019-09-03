import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEmpleado } from 'app/shared/model/empleado.model';
import { AccountService } from 'app/core';
import { EmpleadoService } from './empleado.service';

@Component({
  selector: 'jhi-empleado',
  templateUrl: './empleado.component.html'
})
export class EmpleadoComponent implements OnInit, OnDestroy {
  empleados: IEmpleado[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected empleadoService: EmpleadoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.empleadoService
      .query()
      .pipe(
        filter((res: HttpResponse<IEmpleado[]>) => res.ok),
        map((res: HttpResponse<IEmpleado[]>) => res.body)
      )
      .subscribe(
        (res: IEmpleado[]) => {
          this.empleados = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEmpleados();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEmpleado) {
    return item.id;
  }

  registerChangeInEmpleados() {
    this.eventSubscriber = this.eventManager.subscribe('empleadoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
