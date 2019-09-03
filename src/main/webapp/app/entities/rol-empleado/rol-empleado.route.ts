import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RolEmpleado } from 'app/shared/model/rol-empleado.model';
import { RolEmpleadoService } from './rol-empleado.service';
import { RolEmpleadoComponent } from './rol-empleado.component';
import { RolEmpleadoDetailComponent } from './rol-empleado-detail.component';
import { RolEmpleadoUpdateComponent } from './rol-empleado-update.component';
import { RolEmpleadoDeletePopupComponent } from './rol-empleado-delete-dialog.component';
import { IRolEmpleado } from 'app/shared/model/rol-empleado.model';

@Injectable({ providedIn: 'root' })
export class RolEmpleadoResolve implements Resolve<IRolEmpleado> {
  constructor(private service: RolEmpleadoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRolEmpleado> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RolEmpleado>) => response.ok),
        map((rolEmpleado: HttpResponse<RolEmpleado>) => rolEmpleado.body)
      );
    }
    return of(new RolEmpleado());
  }
}

export const rolEmpleadoRoute: Routes = [
  {
    path: '',
    component: RolEmpleadoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RolEmpleados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RolEmpleadoDetailComponent,
    resolve: {
      rolEmpleado: RolEmpleadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RolEmpleados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RolEmpleadoUpdateComponent,
    resolve: {
      rolEmpleado: RolEmpleadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RolEmpleados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RolEmpleadoUpdateComponent,
    resolve: {
      rolEmpleado: RolEmpleadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RolEmpleados'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rolEmpleadoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RolEmpleadoDeletePopupComponent,
    resolve: {
      rolEmpleado: RolEmpleadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RolEmpleados'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
