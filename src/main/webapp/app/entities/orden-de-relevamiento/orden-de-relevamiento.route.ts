import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrdenDeRelevamiento } from 'app/shared/model/orden-de-relevamiento.model';
import { OrdenDeRelevamientoService } from './orden-de-relevamiento.service';
import { OrdenDeRelevamientoComponent } from './orden-de-relevamiento.component';
import { OrdenDeRelevamientoDetailComponent } from './orden-de-relevamiento-detail.component';
import { OrdenDeRelevamientoUpdateComponent } from './orden-de-relevamiento-update.component';
import { OrdenDeRelevamientoDeletePopupComponent } from './orden-de-relevamiento-delete-dialog.component';
import { IOrdenDeRelevamiento } from 'app/shared/model/orden-de-relevamiento.model';

@Injectable({ providedIn: 'root' })
export class OrdenDeRelevamientoResolve implements Resolve<IOrdenDeRelevamiento> {
  constructor(private service: OrdenDeRelevamientoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrdenDeRelevamiento> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OrdenDeRelevamiento>) => response.ok),
        map((ordenDeRelevamiento: HttpResponse<OrdenDeRelevamiento>) => ordenDeRelevamiento.body)
      );
    }
    return of(new OrdenDeRelevamiento());
  }
}

export const ordenDeRelevamientoRoute: Routes = [
  {
    path: '',
    component: OrdenDeRelevamientoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeRelevamientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrdenDeRelevamientoDetailComponent,
    resolve: {
      ordenDeRelevamiento: OrdenDeRelevamientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeRelevamientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrdenDeRelevamientoUpdateComponent,
    resolve: {
      ordenDeRelevamiento: OrdenDeRelevamientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeRelevamientos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrdenDeRelevamientoUpdateComponent,
    resolve: {
      ordenDeRelevamiento: OrdenDeRelevamientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeRelevamientos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ordenDeRelevamientoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrdenDeRelevamientoDeletePopupComponent,
    resolve: {
      ordenDeRelevamiento: OrdenDeRelevamientoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeRelevamientos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
