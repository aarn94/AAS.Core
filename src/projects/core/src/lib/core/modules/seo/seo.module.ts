import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf, Injector } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { MetaLoader, MetaModule } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';

import { TranslationModule } from '../translate';

import { metaFactory } from './factories';
import { MetaInitService, seoservices } from './services';

// @dynamic
@NgModule({
  declarations: [],
  providers: [
    ...seoservices,
  ],
  imports: [
    CommonModule,
    MetaModule.forRoot({}),
    TranslationModule,
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
        {
          provide: MetaLoader,
          useFactory: metaFactory,
          deps: [ConfigService, TranslateService, MetaInitService, Injector],
        },
      ],
    };
  }
}
