import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DetalleDeOrdenDeCompra } from 'app/shared/model/detalle-de-orden-de-compra.model';
import { DetalleDeOrdenDeCompraService } from './detalle-de-orden-de-compra.service';
import { DetalleDeOrdenDeCompraComponent } from './detalle-de-orden-de-compra.component';
import { DetalleDeOrdenDeCompraDetailComponent } from './detalle-de-orden-de-compra-detail.component';
import { DetalleDeOrdenDeCompraUpdateComponent } from './detalle-de-orden-de-compra-update.component';
import { DetalleDeOrdenDeCompraDeletePopupComponent } from './detalle-de-orden-de-compra-delete-dialog.component';
import { IDetalleDeOrdenDeCompra } from 'app/shared/model/detalle-de-orden-de-compra.model';

@Injectable({ providedIn: 'root' })
export class DetalleDeOrdenDeCompraResolve implements Resolve<IDetalleDeOrdenDeCompra> {
  constructor(private service: DetalleDeOrdenDeCompraService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDetalleDeOrdenDeCompra> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DetalleDeOrdenDeCompra>) => response.ok),
        map((detalleDeOrdenDeCompra: HttpResponse<DetalleDeOrdenDeCompra>) => detalleDeOrdenDeCompra.body)
      );
    }
    return of(new DetalleDeOrdenDeCompra());
  }
}

export const detalleDeOrdenDeCompraRoute: Routes = [
  {
    path: '',
    component: DetalleDeOrdenDeCompraComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleDeOrdenDeCompras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DetalleDeOrdenDeCompraDetailComponent,
    resolve: {
      detalleDeOrdenDeCompra: DetalleDeOrdenDeCompraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleDeOrdenDeCompras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DetalleDeOrdenDeCompraUpdateComponent,
    resolve: {
      detalleDeOrdenDeCompra: DetalleDeOrdenDeCompraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleDeOrdenDeCompras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DetalleDeOrdenDeCompraUpdateComponent,
    resolve: {
      detalleDeOrdenDeCompra: DetalleDeOrdenDeCompraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleDeOrdenDeCompras'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const detalleDeOrdenDeCompraPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DetalleDeOrdenDeCompraDeletePopupComponent,
    resolve: {
      detalleDeOrdenDeCompra: DetalleDeOrdenDeCompraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleDeOrdenDeCompras'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
