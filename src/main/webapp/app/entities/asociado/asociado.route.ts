import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Asociado } from 'app/shared/model/asociado.model';
import { AsociadoService } from './asociado.service';
import { AsociadoComponent } from './asociado.component';
import { AsociadoDetailComponent } from './asociado-detail.component';
import { AsociadoUpdateComponent } from './asociado-update.component';
import { AsociadoDeletePopupComponent } from './asociado-delete-dialog.component';
import { IAsociado } from 'app/shared/model/asociado.model';

@Injectable({ providedIn: 'root' })
export class AsociadoResolve implements Resolve<IAsociado> {
  constructor(private service: AsociadoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAsociado> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Asociado>) => response.ok),
        map((asociado: HttpResponse<Asociado>) => asociado.body)
      );
    }
    return of(new Asociado());
  }
}

export const asociadoRoute: Routes = [
  {
    path: '',
    component: AsociadoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Asociados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AsociadoDetailComponent,
    resolve: {
      asociado: AsociadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Asociados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AsociadoUpdateComponent,
    resolve: {
      asociado: AsociadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Asociados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AsociadoUpdateComponent,
    resolve: {
      asociado: AsociadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Asociados'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const asociadoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AsociadoDeletePopupComponent,
    resolve: {
      asociado: AsociadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Asociados'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
