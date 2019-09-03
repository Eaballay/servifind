import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Presupuesto } from 'app/shared/model/presupuesto.model';
import { PresupuestoService } from './presupuesto.service';
import { PresupuestoComponent } from './presupuesto.component';
import { PresupuestoDetailComponent } from './presupuesto-detail.component';
import { PresupuestoUpdateComponent } from './presupuesto-update.component';
import { PresupuestoDeletePopupComponent } from './presupuesto-delete-dialog.component';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';

@Injectable({ providedIn: 'root' })
export class PresupuestoResolve implements Resolve<IPresupuesto> {
  constructor(private service: PresupuestoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPresupuesto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Presupuesto>) => response.ok),
        map((presupuesto: HttpResponse<Presupuesto>) => presupuesto.body)
      );
    }
    return of(new Presupuesto());
  }
}

export const presupuestoRoute: Routes = [
  {
    path: '',
    component: PresupuestoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Presupuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PresupuestoDetailComponent,
    resolve: {
      presupuesto: PresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Presupuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PresupuestoUpdateComponent,
    resolve: {
      presupuesto: PresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Presupuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PresupuestoUpdateComponent,
    resolve: {
      presupuesto: PresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Presupuestos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const presupuestoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PresupuestoDeletePopupComponent,
    resolve: {
      presupuesto: PresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Presupuestos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
