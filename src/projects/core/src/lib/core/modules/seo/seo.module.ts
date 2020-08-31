import { CommonModule } from '@angular/common';
import { Injector, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { MetaGuard, MetaLoader, MetaService } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';

import { TranslationModule } from '../translate';

import { metaFactory } from './factories';
import { MetaInitService, SeoService } from './services';

// @dynamic
@NgModule({
  declarations: [],
  providers: [
    MetaInitService,
    SeoService,
  ],
  imports: [
    CommonModule,
    TranslationModule,
  ],
  exports: [
  ],
})
export class SeoModule {

  constructor(@Optional() @SkipSelf() parentModule: SeoModule) {
    if (parentModule) {
      throw new Error('SeoModule is already  loaded. Import it in the AppModule only.');
    }
  }
  // tslint:disable-next-line:no-any
  static forRoot(configuredProviders: any[]): ModuleWithProviders<SeoModule> {
    return {
      ngModule: SeoModule,
      providers: [
        MetaGuard,
        MetaService,
        {
          provide: MetaLoader,
          useFactory: metaFactory,
          deps: [ConfigService, TranslateService, MetaInitService, Injector],
        },
      ],
    };
  }
}
