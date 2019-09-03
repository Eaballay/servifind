import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiFindSharedModule } from 'app/shared';
import {
  PresupuestoComponent,
  PresupuestoDetailComponent,
  PresupuestoUpdateComponent,
  PresupuestoDeletePopupComponent,
  PresupuestoDeleteDialogComponent,
  presupuestoRoute,
  presupuestoPopupRoute
} from './';

const ENTITY_STATES = [...presupuestoRoute, ...presupuestoPopupRoute];

@NgModule({
  imports: [ServiFindSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PresupuestoComponent,
    PresupuestoDetailComponent,
    PresupuestoUpdateComponent,
    PresupuestoDeleteDialogComponent,
    PresupuestoDeletePopupComponent
  ],
  entryComponents: [PresupuestoComponent, PresupuestoUpdateComponent, PresupuestoDeleteDialogComponent, PresupuestoDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindPresupuestoModule {}
