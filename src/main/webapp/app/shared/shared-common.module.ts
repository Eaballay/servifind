import { NgModule } from '@angular/core';

import { ServiFindSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [ServiFindSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [ServiFindSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ServiFindSharedCommonModule {}
