import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiFindSharedModule } from 'app/shared';
import {
  EvaluacionDeProyectoComponent,
  EvaluacionDeProyectoDetailComponent,
  EvaluacionDeProyectoUpdateComponent,
  EvaluacionDeProyectoDeletePopupComponent,
  EvaluacionDeProyectoDeleteDialogComponent,
  evaluacionDeProyectoRoute,
  evaluacionDeProyectoPopupRoute
} from './';

const ENTITY_STATES = [...evaluacionDeProyectoRoute, ...evaluacionDeProyectoPopupRoute];

@NgModule({
  imports: [ServiFindSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EvaluacionDeProyectoComponent,
    EvaluacionDeProyectoDetailComponent,
    EvaluacionDeProyectoUpdateComponent,
    EvaluacionDeProyectoDeleteDialogComponent,
    EvaluacionDeProyectoDeletePopupComponent
  ],
  entryComponents: [
    EvaluacionDeProyectoComponent,
    EvaluacionDeProyectoUpdateComponent,
    EvaluacionDeProyectoDeleteDialogComponent,
    EvaluacionDeProyectoDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindEvaluacionDeProyectoModule {}
