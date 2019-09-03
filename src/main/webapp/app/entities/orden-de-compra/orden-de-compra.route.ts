import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrdenDeCompra } from 'app/shared/model/orden-de-compra.model';
import { OrdenDeCompraService } from './orden-de-compra.service';
import { OrdenDeCompraComponent } from './orden-de-compra.component';
import { OrdenDeCompraDetailComponent } from './orden-de-compra-detail.component';
import { OrdenDeCompraUpdateComponent } from './orden-de-compra-update.component';
import { OrdenDeCompraDeletePopupComponent } from './orden-de-compra-delete-dialog.component';
import { IOrdenDeCompra } from 'app/shared/model/orden-de-compra.model';

@Injectable({ providedIn: 'root' })
export class OrdenDeCompraResolve implements Resolve<IOrdenDeCompra> {
  constructor(private service: OrdenDeCompraService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrdenDeCompra> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OrdenDeCompra>) => response.ok),
        map((ordenDeCompra: HttpResponse<OrdenDeCompra>) => ordenDeCompra.body)
      );
    }
    return of(new OrdenDeCompra());
  }
}

export const ordenDeCompraRoute: Routes = [
  {
    path: '',
    component: OrdenDeCompraComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeCompras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrdenDeCompraDetailComponent,
    resolve: {
      ordenDeCompra: OrdenDeCompraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeCompras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrdenDeCompraUpdateComponent,
    resolve: {
      ordenDeCompra: OrdenDeCompraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeCompras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrdenDeCompraUpdateComponent,
    resolve: {
      ordenDeCompra: OrdenDeCompraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeCompras'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ordenDeCompraPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrdenDeCompraDeletePopupComponent,
    resolve: {
      ordenDeCompra: OrdenDeCompraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeCompras'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
