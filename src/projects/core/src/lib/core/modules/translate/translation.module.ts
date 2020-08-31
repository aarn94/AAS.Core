import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injector, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { httpTranslateLoader } from './factories';
import { InternalizationService, LocaleService } from './services';

// @dynamic
@NgModule({
  declarations: [],
  providers: [
    InternalizationService,
    LocaleService,
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
