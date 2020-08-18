import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { NgModule, Optional, SkipSelf, ModuleWithProviders, Injector } from '@angular/core';
import { CookieService, CookieBackendService } from '@gorniv/ngx-universal';
import { ConfigLoader } from '@ngx-config/core';
import { universalConfigLoader } from './factories';
import { TransferState } from '@angular/platform-browser';
import { TranslationServerModule } from './modules/translate';
import { AnalyticsServerModule } from './modules/analytics';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AnalyticsServerModule,
    TranslationServerModule,
  ],
})
export class CoreServerModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreServerModule) {
    if (parentModule) {
      throw new Error('CoreModule is already  loaded. Import it in the AppModule only.');
    }
  }
  // tslint:disable-next-line:no-any
  static forRoot(configuredProviders: any[]): ModuleWithProviders<CoreServerModule> {
    return {
      ngModule: CoreServerModule,
      providers: [
        ...configuredProviders,
        { provide: CookieService, useClass: CookieBackendService },
        {
          provide: ConfigLoader,
          useFactory: universalConfigLoader,
          deps: [TransferState, Injector],
        },
      ],
    };
  }
}
