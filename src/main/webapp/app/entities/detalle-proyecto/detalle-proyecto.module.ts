import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiFindSharedModule } from 'app/shared';
import {
  DetalleProyectoComponent,
  DetalleProyectoDetailComponent,
  DetalleProyectoUpdateComponent,
  DetalleProyectoDeletePopupComponent,
  DetalleProyectoDeleteDialogComponent,
  detalleProyectoRoute,
  detalleProyectoPopupRoute
} from './';

const ENTITY_STATES = [...detalleProyectoRoute, ...detalleProyectoPopupRoute];

@NgModule({
  imports: [ServiFindSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DetalleProyectoComponent,
    DetalleProyectoDetailComponent,
    DetalleProyectoUpdateComponent,
    DetalleProyectoDeleteDialogComponent,
    DetalleProyectoDeletePopupComponent
  ],
  entryComponents: [
    DetalleProyectoComponent,
    DetalleProyectoUpdateComponent,
    DetalleProyectoDeleteDialogComponent,
    DetalleProyectoDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindDetalleProyectoModule {}
