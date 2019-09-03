import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiFindSharedModule } from 'app/shared';
import {
  DetalleDePresupuestoComponent,
  DetalleDePresupuestoDetailComponent,
  DetalleDePresupuestoUpdateComponent,
  DetalleDePresupuestoDeletePopupComponent,
  DetalleDePresupuestoDeleteDialogComponent,
  detalleDePresupuestoRoute,
  detalleDePresupuestoPopupRoute
} from './';

const ENTITY_STATES = [...detalleDePresupuestoRoute, ...detalleDePresupuestoPopupRoute];

@NgModule({
  imports: [ServiFindSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DetalleDePresupuestoComponent,
    DetalleDePresupuestoDetailComponent,
    DetalleDePresupuestoUpdateComponent,
    DetalleDePresupuestoDeleteDialogComponent,
    DetalleDePresupuestoDeletePopupComponent
  ],
  entryComponents: [
    DetalleDePresupuestoComponent,
    DetalleDePresupuestoUpdateComponent,
    DetalleDePresupuestoDeleteDialogComponent,
    DetalleDePresupuestoDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindDetalleDePresupuestoModule {}
