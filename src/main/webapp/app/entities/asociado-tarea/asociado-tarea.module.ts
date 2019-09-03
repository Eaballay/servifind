import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiFindSharedModule } from 'app/shared';
import {
  AsociadoTareaComponent,
  AsociadoTareaDetailComponent,
  AsociadoTareaUpdateComponent,
  AsociadoTareaDeletePopupComponent,
  AsociadoTareaDeleteDialogComponent,
  asociadoTareaRoute,
  asociadoTareaPopupRoute
} from './';

const ENTITY_STATES = [...asociadoTareaRoute, ...asociadoTareaPopupRoute];

@NgModule({
  imports: [ServiFindSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AsociadoTareaComponent,
    AsociadoTareaDetailComponent,
    AsociadoTareaUpdateComponent,
    AsociadoTareaDeleteDialogComponent,
    AsociadoTareaDeletePopupComponent
  ],
  entryComponents: [
    AsociadoTareaComponent,
    AsociadoTareaUpdateComponent,
    AsociadoTareaDeleteDialogComponent,
    AsociadoTareaDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindAsociadoTareaModule {}
