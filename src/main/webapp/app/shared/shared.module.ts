import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ServiFindSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ServiFindSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ServiFindSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiFindSharedModule {
  static forRoot() {
    return {
      ngModule: ServiFindSharedModule
    };
  }
}
