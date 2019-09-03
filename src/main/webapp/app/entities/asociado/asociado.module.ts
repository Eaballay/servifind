import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiFindSharedModule } from 'app/shared';
import {
  AsociadoComponent,
  AsociadoDetailComponent,
  AsociadoUpdateComponent,
  AsociadoDeletePopupComponent,
  AsociadoDeleteDialogComponent,
  asociadoRoute,
  asociadoPopupRoute
} from './';

const ENTITY_STATES = [...asociadoRoute, ...asociadoPopupRoute];

@NgModule({
  imports: [ServiFindSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AsociadoComponent,
    AsociadoDetailComponent,
    AsociadoUpdateComponent,
    AsociadoDeleteDialogComponent,
    AsociadoDeletePopupComponent
  ],
  entryComponents: [AsociadoComponent, AsociadoUpdateComponent, AsociadoDeleteDialogComponent, AsociadoDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindAsociadoModule {}
