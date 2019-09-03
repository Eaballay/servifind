import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiFindSharedModule } from 'app/shared';
import {
  OrdenDeRelevamientoComponent,
  OrdenDeRelevamientoDetailComponent,
  OrdenDeRelevamientoUpdateComponent,
  OrdenDeRelevamientoDeletePopupComponent,
  OrdenDeRelevamientoDeleteDialogComponent,
  ordenDeRelevamientoRoute,
  ordenDeRelevamientoPopupRoute
} from './';

const ENTITY_STATES = [...ordenDeRelevamientoRoute, ...ordenDeRelevamientoPopupRoute];

@NgModule({
  imports: [ServiFindSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrdenDeRelevamientoComponent,
    OrdenDeRelevamientoDetailComponent,
    OrdenDeRelevamientoUpdateComponent,
    OrdenDeRelevamientoDeleteDialogComponent,
    OrdenDeRelevamientoDeletePopupComponent
  ],
  entryComponents: [
    OrdenDeRelevamientoComponent,
    OrdenDeRelevamientoUpdateComponent,
    OrdenDeRelevamientoDeleteDialogComponent,
    OrdenDeRelevamientoDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindOrdenDeRelevamientoModule {}
