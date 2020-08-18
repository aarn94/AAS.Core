import { ModuleWithProviders, NgModule, Optional, SkipSelf, Injector } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { AnalyticsService } from './services';
import { analyticsServerLoader } from './factories';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [],
  providers: [
    {
      provide: AnalyticsService,
      useFactory: analyticsServerLoader,
    },
  ]
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
