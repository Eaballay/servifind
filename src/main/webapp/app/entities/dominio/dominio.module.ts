import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiFindSharedModule } from 'app/shared';
import {
  DominioComponent,
  DominioDetailComponent,
  DominioUpdateComponent,
  DominioDeletePopupComponent,
  DominioDeleteDialogComponent,
  dominioRoute,
  dominioPopupRoute
} from './';

const ENTITY_STATES = [...dominioRoute, ...dominioPopupRoute];

@NgModule({
  imports: [ServiFindSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DominioComponent,
    DominioDetailComponent,
    DominioUpdateComponent,
    DominioDeleteDialogComponent,
    DominioDeletePopupComponent
  ],
  entryComponents: [DominioComponent, DominioUpdateComponent, DominioDeleteDialogComponent, DominioDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindDominioModule {}
