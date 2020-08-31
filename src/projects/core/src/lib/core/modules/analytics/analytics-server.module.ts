import { Injector, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { AASSharedModule } from '../../../shared/shared.module';

import { analyticsServerLoader } from './factories';
import { AnalyticsService } from './services';

@NgModule({
  imports: [
    AASSharedModule,
  ],
  exports: [],
  providers: [
    {
      provide: AnalyticsService,
      useFactory: analyticsServerLoader,
    },
  ],
})
export class AnalyticsServerModule {

  constructor(@Optional() @SkipSelf() parentModule: AnalyticsServerModule) {
    if (parentModule) {
      throw new Error('AnalyticsServerModule is already  loaded. Import it in the AppModule only.');
    }
  }
  // tslint:disable-next-line:no-any
  static forRoot(configuredProviders: any[]): ModuleWithProviders<AnalyticsServerModule> {
    return {
      ngModule: AnalyticsServerModule,
      providers: configuredProviders,
    };
  }
}
