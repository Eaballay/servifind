import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrdenDeTrabajo } from 'app/shared/model/orden-de-trabajo.model';
import { OrdenDeTrabajoService } from './orden-de-trabajo.service';
import { OrdenDeTrabajoComponent } from './orden-de-trabajo.component';
import { OrdenDeTrabajoDetailComponent } from './orden-de-trabajo-detail.component';
import { OrdenDeTrabajoUpdateComponent } from './orden-de-trabajo-update.component';
import { OrdenDeTrabajoDeletePopupComponent } from './orden-de-trabajo-delete-dialog.component';
import { IOrdenDeTrabajo } from 'app/shared/model/orden-de-trabajo.model';

@Injectable({ providedIn: 'root' })
export class OrdenDeTrabajoResolve implements Resolve<IOrdenDeTrabajo> {
  constructor(private service: OrdenDeTrabajoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrdenDeTrabajo> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OrdenDeTrabajo>) => response.ok),
        map((ordenDeTrabajo: HttpResponse<OrdenDeTrabajo>) => ordenDeTrabajo.body)
      );
    }
    return of(new OrdenDeTrabajo());
  }
}

export const ordenDeTrabajoRoute: Routes = [
  {
    path: '',
    component: OrdenDeTrabajoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeTrabajos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrdenDeTrabajoDetailComponent,
    resolve: {
      ordenDeTrabajo: OrdenDeTrabajoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeTrabajos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrdenDeTrabajoUpdateComponent,
    resolve: {
      ordenDeTrabajo: OrdenDeTrabajoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeTrabajos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrdenDeTrabajoUpdateComponent,
    resolve: {
      ordenDeTrabajo: OrdenDeTrabajoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeTrabajos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ordenDeTrabajoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrdenDeTrabajoDeletePopupComponent,
    resolve: {
      ordenDeTrabajo: OrdenDeTrabajoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeTrabajos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
