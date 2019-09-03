import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiFindSharedModule } from 'app/shared';
import {
  OrdenDeTrabajoTareaComponent,
  OrdenDeTrabajoTareaDetailComponent,
  OrdenDeTrabajoTareaUpdateComponent,
  OrdenDeTrabajoTareaDeletePopupComponent,
  OrdenDeTrabajoTareaDeleteDialogComponent,
  ordenDeTrabajoTareaRoute,
  ordenDeTrabajoTareaPopupRoute
} from './';

const ENTITY_STATES = [...ordenDeTrabajoTareaRoute, ...ordenDeTrabajoTareaPopupRoute];

@NgModule({
  imports: [ServiFindSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrdenDeTrabajoTareaComponent,
    OrdenDeTrabajoTareaDetailComponent,
    OrdenDeTrabajoTareaUpdateComponent,
    OrdenDeTrabajoTareaDeleteDialogComponent,
    OrdenDeTrabajoTareaDeletePopupComponent
  ],
  entryComponents: [
    OrdenDeTrabajoTareaComponent,
    OrdenDeTrabajoTareaUpdateComponent,
    OrdenDeTrabajoTareaDeleteDialogComponent,
    OrdenDeTrabajoTareaDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindOrdenDeTrabajoTareaModule {}
