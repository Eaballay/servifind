import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiFindSharedModule } from 'app/shared';
import {
  PersonaComponent,
  PersonaDetailComponent,
  PersonaUpdateComponent,
  PersonaDeletePopupComponent,
  PersonaDeleteDialogComponent,
  personaRoute,
  personaPopupRoute
} from './';

const ENTITY_STATES = [...personaRoute, ...personaPopupRoute];

@NgModule({
  imports: [ServiFindSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PersonaComponent,
    PersonaDetailComponent,
    PersonaUpdateComponent,
    PersonaDeleteDialogComponent,
    PersonaDeletePopupComponent
  ],
  entryComponents: [PersonaComponent, PersonaUpdateComponent, PersonaDeleteDialogComponent, PersonaDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindPersonaModule {}
