import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiFindSharedModule } from 'app/shared';
import {
  OrdenDeTrabajoComponent,
  OrdenDeTrabajoDetailComponent,
  OrdenDeTrabajoUpdateComponent,
  OrdenDeTrabajoDeletePopupComponent,
  OrdenDeTrabajoDeleteDialogComponent,
  ordenDeTrabajoRoute,
  ordenDeTrabajoPopupRoute
} from './';

const ENTITY_STATES = [...ordenDeTrabajoRoute, ...ordenDeTrabajoPopupRoute];

@NgModule({
  imports: [ServiFindSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrdenDeTrabajoComponent,
    OrdenDeTrabajoDetailComponent,
    OrdenDeTrabajoUpdateComponent,
    OrdenDeTrabajoDeleteDialogComponent,
    OrdenDeTrabajoDeletePopupComponent
  ],
  entryComponents: [
    OrdenDeTrabajoComponent,
    OrdenDeTrabajoUpdateComponent,
    OrdenDeTrabajoDeleteDialogComponent,
    OrdenDeTrabajoDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindOrdenDeTrabajoModule {}
