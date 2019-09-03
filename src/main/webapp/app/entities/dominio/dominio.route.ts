import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Dominio } from 'app/shared/model/dominio.model';
import { DominioService } from './dominio.service';
import { DominioComponent } from './dominio.component';
import { DominioDetailComponent } from './dominio-detail.component';
import { DominioUpdateComponent } from './dominio-update.component';
import { DominioDeletePopupComponent } from './dominio-delete-dialog.component';
import { IDominio } from 'app/shared/model/dominio.model';

@Injectable({ providedIn: 'root' })
export class DominioResolve implements Resolve<IDominio> {
  constructor(private service: DominioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDominio> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Dominio>) => response.ok),
        map((dominio: HttpResponse<Dominio>) => dominio.body)
      );
    }
    return of(new Dominio());
  }
}

export const dominioRoute: Routes = [
  {
    path: '',
    component: DominioComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dominios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DominioDetailComponent,
    resolve: {
      dominio: DominioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dominios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DominioUpdateComponent,
    resolve: {
      dominio: DominioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dominios'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DominioUpdateComponent,
    resolve: {
      dominio: DominioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dominios'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const dominioPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DominioDeletePopupComponent,
    resolve: {
      dominio: DominioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Dominios'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
