import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf, Injector } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { httpTranslateLoader } from './factories';
import { translateservices } from './services';

// @dynamic
@NgModule({
  declarations: [],
  providers: [
    ...translateservices,
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient, TransferState, Injector],
      },
    }),
  ],
})
export class TranslationModule {

  constructor() {
  }
  // tslint:disable-next-line:no-any
  static forRoot(configuredProviders: any[]): ModuleWithProviders<TranslationModule> {
    return {
      ngModule: TranslationModule,
      providers: configuredProviders,
    };
  }
}
