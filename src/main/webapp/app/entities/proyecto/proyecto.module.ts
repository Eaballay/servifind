import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiFindSharedModule } from 'app/shared';
import {
  ProyectoComponent,
  ProyectoDetailComponent,
  ProyectoUpdateComponent,
  ProyectoDeletePopupComponent,
  ProyectoDeleteDialogComponent,
  proyectoRoute,
  proyectoPopupRoute
} from './';

const ENTITY_STATES = [...proyectoRoute, ...proyectoPopupRoute];

@NgModule({
  imports: [ServiFindSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProyectoComponent,
    ProyectoDetailComponent,
    ProyectoUpdateComponent,
    ProyectoDeleteDialogComponent,
    ProyectoDeletePopupComponent
  ],
  entryComponents: [ProyectoComponent, ProyectoUpdateComponent, ProyectoDeleteDialogComponent, ProyectoDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindProyectoModule {}
