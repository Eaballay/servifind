import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AsociadoTarea } from 'app/shared/model/asociado-tarea.model';
import { AsociadoTareaService } from './asociado-tarea.service';
import { AsociadoTareaComponent } from './asociado-tarea.component';
import { AsociadoTareaDetailComponent } from './asociado-tarea-detail.component';
import { AsociadoTareaUpdateComponent } from './asociado-tarea-update.component';
import { AsociadoTareaDeletePopupComponent } from './asociado-tarea-delete-dialog.component';
import { IAsociadoTarea } from 'app/shared/model/asociado-tarea.model';

@Injectable({ providedIn: 'root' })
export class AsociadoTareaResolve implements Resolve<IAsociadoTarea> {
  constructor(private service: AsociadoTareaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAsociadoTarea> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AsociadoTarea>) => response.ok),
        map((asociadoTarea: HttpResponse<AsociadoTarea>) => asociadoTarea.body)
      );
    }
    return of(new AsociadoTarea());
  }
}

export const asociadoTareaRoute: Routes = [
  {
    path: '',
    component: AsociadoTareaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AsociadoTareas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AsociadoTareaDetailComponent,
    resolve: {
      asociadoTarea: AsociadoTareaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AsociadoTareas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AsociadoTareaUpdateComponent,
    resolve: {
      asociadoTarea: AsociadoTareaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AsociadoTareas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AsociadoTareaUpdateComponent,
    resolve: {
      asociadoTarea: AsociadoTareaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AsociadoTareas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const asociadoTareaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AsociadoTareaDeletePopupComponent,
    resolve: {
      asociadoTarea: AsociadoTareaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AsociadoTareas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
