import { CommonModule } from '@angular/common';
import { Injector, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { CookieBackendService, CookieService } from '@gorniv/ngx-universal';
import { ConfigLoader } from '@ngx-config/core';

import { AASSharedModule } from '../shared';

import { universalConfigLoader } from './factories';
import { AnalyticsServerModule } from './modules/analytics';
import { TranslationServerModule } from './modules/translate';
import { NotificationService, ServerNotificationService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AASSharedModule,
    AnalyticsServerModule,
    TranslationServerModule,
  ],
})
export class AASCoreServerModule {

  constructor(@Optional() @SkipSelf() parentModule: AASCoreServerModule) {
    if (parentModule) {
      throw new Error('AASCoreServerModule is already  loaded. Import it in the AppModule only.');
    }
  }
  // tslint:disable-next-line:no-any
  static forRoot(configuredProviders: any[]): ModuleWithProviders<AASCoreServerModule> {
    return {
      ngModule: AASCoreServerModule,
      providers: [
        ...configuredProviders,
        { provide: CookieService, useClass: CookieBackendService },
        { provide: NotificationService, useClass: ServerNotificationService },
        {
          provide: ConfigLoader,
          useFactory: universalConfigLoader,
          deps: [TransferState, Injector],
        },
      ],
    };
  }
}
