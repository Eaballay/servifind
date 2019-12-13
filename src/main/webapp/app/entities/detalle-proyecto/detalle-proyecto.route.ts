import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DetalleProyecto } from 'app/shared/model/detalle-proyecto.model';
import { DetalleProyectoService } from './detalle-proyecto.service';
import { DetalleProyectoComponent } from './detalle-proyecto.component';
import { DetalleProyectoDetailComponent } from './detalle-proyecto-detail.component';
import { DetalleProyectoUpdateComponent } from './detalle-proyecto-update.component';
import { DetalleProyectoDeletePopupComponent } from './detalle-proyecto-delete-dialog.component';
import { IDetalleProyecto } from 'app/shared/model/detalle-proyecto.model';

@Injectable({ providedIn: 'root' })
export class DetalleProyectoResolve implements Resolve<IDetalleProyecto> {
  constructor(private service: DetalleProyectoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDetalleProyecto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DetalleProyecto>) => response.ok),
        map((detalleProyecto: HttpResponse<DetalleProyecto>) => detalleProyecto.body)
      );
    }
    return of(new DetalleProyecto());
  }
}

export const detalleProyectoRoute: Routes = [
  {
    path: '',
    component: DetalleProyectoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleProyectos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DetalleProyectoDetailComponent,
    resolve: {
      detalleProyecto: DetalleProyectoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleProyectos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DetalleProyectoUpdateComponent,
    resolve: {
      detalleProyecto: DetalleProyectoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleProyectos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DetalleProyectoUpdateComponent,
    resolve: {
      detalleProyecto: DetalleProyectoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleProyectos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const detalleProyectoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DetalleProyectoDeletePopupComponent,
    resolve: {
      detalleProyecto: DetalleProyectoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DetalleProyectos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
