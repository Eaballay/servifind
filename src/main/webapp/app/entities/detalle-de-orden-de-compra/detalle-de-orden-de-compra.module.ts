import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiFindSharedModule } from 'app/shared';
import {
  DetalleDeOrdenDeCompraComponent,
  DetalleDeOrdenDeCompraDetailComponent,
  DetalleDeOrdenDeCompraUpdateComponent,
  DetalleDeOrdenDeCompraDeletePopupComponent,
  DetalleDeOrdenDeCompraDeleteDialogComponent,
  detalleDeOrdenDeCompraRoute,
  detalleDeOrdenDeCompraPopupRoute
} from './';

const ENTITY_STATES = [...detalleDeOrdenDeCompraRoute, ...detalleDeOrdenDeCompraPopupRoute];

@NgModule({
  imports: [ServiFindSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DetalleDeOrdenDeCompraComponent,
    DetalleDeOrdenDeCompraDetailComponent,
    DetalleDeOrdenDeCompraUpdateComponent,
    DetalleDeOrdenDeCompraDeleteDialogComponent,
    DetalleDeOrdenDeCompraDeletePopupComponent
  ],
  entryComponents: [
    DetalleDeOrdenDeCompraComponent,
    DetalleDeOrdenDeCompraUpdateComponent,
    DetalleDeOrdenDeCompraDeleteDialogComponent,
    DetalleDeOrdenDeCompraDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindDetalleDeOrdenDeCompraModule {}
