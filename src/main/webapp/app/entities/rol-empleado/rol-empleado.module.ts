import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiFindSharedModule } from 'app/shared';
import {
  RolEmpleadoComponent,
  RolEmpleadoDetailComponent,
  RolEmpleadoUpdateComponent,
  RolEmpleadoDeletePopupComponent,
  RolEmpleadoDeleteDialogComponent,
  rolEmpleadoRoute,
  rolEmpleadoPopupRoute
} from './';

const ENTITY_STATES = [...rolEmpleadoRoute, ...rolEmpleadoPopupRoute];

@NgModule({
  imports: [ServiFindSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RolEmpleadoComponent,
    RolEmpleadoDetailComponent,
    RolEmpleadoUpdateComponent,
    RolEmpleadoDeleteDialogComponent,
    RolEmpleadoDeletePopupComponent
  ],
  entryComponents: [RolEmpleadoComponent, RolEmpleadoUpdateComponent, RolEmpleadoDeleteDialogComponent, RolEmpleadoDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindRolEmpleadoModule {}
