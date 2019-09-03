import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DetalleDePresupuesto } from 'app/shared/model/detalle-de-presupuesto.model';
import { DetalleDePresupuestoService } from './detalle-de-presupuesto.service';
import { DetalleDePresupuestoComponent } from './detalle-de-presupuesto.component';
import { DetalleDePresupuestoDetailComponent } from './detalle-de-presupuesto-detail.component';
import { DetalleDePresupuestoUpdateComponent } from './detalle-de-presupuesto-update.component';
import { DetalleDePresupuestoDeletePopupComponent } from './detalle-de-presupuesto-delete-dialog.component';
import { IDetalleDePresupuesto } from 'app/shared/model/detalle-de-presupuesto.model';

@Injectable({ providedIn: 'root' })
export class DetalleDePresupuestoResolve implements Resolve<IDetalleDePresupuesto> {
  constructor(private service: DetalleDePresupuestoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDetalleDePresupuesto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DetalleDePresupuesto>) => response.ok),
        map((detalleDePresupuesto: HttpResponse<DetalleDePresupuesto>) => detalleDePresupuesto.body)
      );
    }
    return of(new DetalleDePresupuesto());
  }
}

export const detalleDePresupuestoRoute: Routes = [
  {
    path: '',
    component: DetalleDePresupuestoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleDePresupuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DetalleDePresupuestoDetailComponent,
    resolve: {
      detalleDePresupuesto: DetalleDePresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleDePresupuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DetalleDePresupuestoUpdateComponent,
    resolve: {
      detalleDePresupuesto: DetalleDePresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleDePresupuestos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DetalleDePresupuestoUpdateComponent,
    resolve: {
      detalleDePresupuesto: DetalleDePresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleDePresupuestos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const detalleDePresupuestoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DetalleDePresupuestoDeletePopupComponent,
    resolve: {
      detalleDePresupuesto: DetalleDePresupuestoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleDePresupuestos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
