import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrdenDeTrabajoTarea } from 'app/shared/model/orden-de-trabajo-tarea.model';
import { OrdenDeTrabajoTareaService } from './orden-de-trabajo-tarea.service';
import { OrdenDeTrabajoTareaComponent } from './orden-de-trabajo-tarea.component';
import { OrdenDeTrabajoTareaDetailComponent } from './orden-de-trabajo-tarea-detail.component';
import { OrdenDeTrabajoTareaUpdateComponent } from './orden-de-trabajo-tarea-update.component';
import { OrdenDeTrabajoTareaDeletePopupComponent } from './orden-de-trabajo-tarea-delete-dialog.component';
import { IOrdenDeTrabajoTarea } from 'app/shared/model/orden-de-trabajo-tarea.model';

@Injectable({ providedIn: 'root' })
export class OrdenDeTrabajoTareaResolve implements Resolve<IOrdenDeTrabajoTarea> {
  constructor(private service: OrdenDeTrabajoTareaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrdenDeTrabajoTarea> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OrdenDeTrabajoTarea>) => response.ok),
        map((ordenDeTrabajoTarea: HttpResponse<OrdenDeTrabajoTarea>) => ordenDeTrabajoTarea.body)
      );
    }
    return of(new OrdenDeTrabajoTarea());
  }
}

export const ordenDeTrabajoTareaRoute: Routes = [
  {
    path: '',
    component: OrdenDeTrabajoTareaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeTrabajoTareas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrdenDeTrabajoTareaDetailComponent,
    resolve: {
      ordenDeTrabajoTarea: OrdenDeTrabajoTareaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeTrabajoTareas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrdenDeTrabajoTareaUpdateComponent,
    resolve: {
      ordenDeTrabajoTarea: OrdenDeTrabajoTareaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeTrabajoTareas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrdenDeTrabajoTareaUpdateComponent,
    resolve: {
      ordenDeTrabajoTarea: OrdenDeTrabajoTareaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeTrabajoTareas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ordenDeTrabajoTareaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrdenDeTrabajoTareaDeletePopupComponent,
    resolve: {
      ordenDeTrabajoTarea: OrdenDeTrabajoTareaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrdenDeTrabajoTareas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
