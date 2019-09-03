import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiFindSharedModule } from 'app/shared';
import {
  OrdenDeCompraComponent,
  OrdenDeCompraDetailComponent,
  OrdenDeCompraUpdateComponent,
  OrdenDeCompraDeletePopupComponent,
  OrdenDeCompraDeleteDialogComponent,
  ordenDeCompraRoute,
  ordenDeCompraPopupRoute
} from './';

const ENTITY_STATES = [...ordenDeCompraRoute, ...ordenDeCompraPopupRoute];

@NgModule({
  imports: [ServiFindSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrdenDeCompraComponent,
    OrdenDeCompraDetailComponent,
    OrdenDeCompraUpdateComponent,
    OrdenDeCompraDeleteDialogComponent,
    OrdenDeCompraDeletePopupComponent
  ],
  entryComponents: [
    OrdenDeCompraComponent,
    OrdenDeCompraUpdateComponent,
    OrdenDeCompraDeleteDialogComponent,
    OrdenDeCompraDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindOrdenDeCompraModule {}
