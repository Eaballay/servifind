import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EvaluacionDeProyecto } from 'app/shared/model/evaluacion-de-proyecto.model';
import { EvaluacionDeProyectoService } from './evaluacion-de-proyecto.service';
import { EvaluacionDeProyectoComponent } from './evaluacion-de-proyecto.component';
import { EvaluacionDeProyectoDetailComponent } from './evaluacion-de-proyecto-detail.component';
import { EvaluacionDeProyectoUpdateComponent } from './evaluacion-de-proyecto-update.component';
import { EvaluacionDeProyectoDeletePopupComponent } from './evaluacion-de-proyecto-delete-dialog.component';
import { IEvaluacionDeProyecto } from 'app/shared/model/evaluacion-de-proyecto.model';

@Injectable({ providedIn: 'root' })
export class EvaluacionDeProyectoResolve implements Resolve<IEvaluacionDeProyecto> {
  constructor(private service: EvaluacionDeProyectoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEvaluacionDeProyecto> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EvaluacionDeProyecto>) => response.ok),
        map((evaluacionDeProyecto: HttpResponse<EvaluacionDeProyecto>) => evaluacionDeProyecto.body)
      );
    }
    return of(new EvaluacionDeProyecto());
  }
}

export const evaluacionDeProyectoRoute: Routes = [
  {
    path: '',
    component: EvaluacionDeProyectoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EvaluacionDeProyectos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EvaluacionDeProyectoDetailComponent,
    resolve: {
      evaluacionDeProyecto: EvaluacionDeProyectoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EvaluacionDeProyectos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EvaluacionDeProyectoUpdateComponent,
    resolve: {
      evaluacionDeProyecto: EvaluacionDeProyectoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EvaluacionDeProyectos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EvaluacionDeProyectoUpdateComponent,
    resolve: {
      evaluacionDeProyecto: EvaluacionDeProyectoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EvaluacionDeProyectos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const evaluacionDeProyectoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EvaluacionDeProyectoDeletePopupComponent,
    resolve: {
      evaluacionDeProyecto: EvaluacionDeProyectoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EvaluacionDeProyectos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
