import { CommonModule } from '@angular/common';
import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { universalTranslateLoader } from './factories';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: universalTranslateLoader,
        deps: [TransferState, Injector],
      },
    }),
  ],
})
export class TranslationServerModule {

  constructor() {
  }
  // tslint:disable-next-line:no-any
  static forRoot(configuredProviders: any[]): ModuleWithProviders<TranslationServerModule> {
    return {
      ngModule: TranslationServerModule,
      providers: configuredProviders,
    };
  }
}
