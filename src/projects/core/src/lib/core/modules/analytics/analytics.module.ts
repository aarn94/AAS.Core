import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf, Injector } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { LogService } from '../../../shared/services';
import { SharedModule } from '../../../shared';
import { Angulartics2, Angulartics2Module, ANGULARTICS2_TOKEN } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2RouterlessModule } from 'angulartics2/routerlessmodule';

import { analyticsLoader } from './factories';
import { AnalyticsService, analyticsServices } from './services';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    Angulartics2Module.forRoot({
      pageTracking: {
        clearQueryParams: true,
        clearHash: true,
      },
     }),
     Angulartics2RouterlessModule.forRoot({}),
  ],
  exports: [Angulartics2Module],
  providers: [
    ...analyticsServices,
    Angulartics2,
    {
      provide: AnalyticsService,
      useFactory: analyticsLoader,
      deps: [Angulartics2, LogService, ConfigService, Injector],
    },
    {
      provide: ANGULARTICS2_TOKEN,
      useValue: {
        providers: [Angulartics2GoogleAnalytics],
        settings: {},
      },
    },
  ],
})
export class AnalyticsModule {

  constructor(@Optional() @SkipSelf() parentModule: AnalyticsModule) {
    if (parentModule) {
      throw new Error('StateModule is already  loaded. Import it in the AppModule only.');
    }
  }
  // tslint:disable-next-line:no-any
  static forRoot(configuredProviders: any[]): ModuleWithProviders<AnalyticsModule> {
    return {
      ngModule: AnalyticsModule,
      providers: configuredProviders,
    };
  }
}
