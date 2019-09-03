import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRolEmpleado } from 'app/shared/model/rol-empleado.model';
import { AccountService } from 'app/core';
import { RolEmpleadoService } from './rol-empleado.service';

@Component({
  selector: 'jhi-rol-empleado',
  templateUrl: './rol-empleado.component.html'
})
export class RolEmpleadoComponent implements OnInit, OnDestroy {
  rolEmpleados: IRolEmpleado[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected rolEmpleadoService: RolEmpleadoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.rolEmpleadoService
      .query()
      .pipe(
        filter((res: HttpResponse<IRolEmpleado[]>) => res.ok),
        map((res: HttpResponse<IRolEmpleado[]>) => res.body)
      )
      .subscribe(
        (res: IRolEmpleado[]) => {
          this.rolEmpleados = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRolEmpleados();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRolEmpleado) {
    return item.id;
  }

  registerChangeInRolEmpleados() {
    this.eventSubscriber = this.eventManager.subscribe('rolEmpleadoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
