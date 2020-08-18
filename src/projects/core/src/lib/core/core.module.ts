import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf, Inject } from '@angular/core';
import { BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { CookieModule, CookieService, TransferHttpModule, TransferHttpService } from '@gorniv/ngx-universal';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { ConfigLoader, ConfigModule } from '@ngx-config/core';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ConsoleService, shared_services } from '../shared/services';
import { SharedModule } from '../shared';
import { ToastrModule } from 'ngx-toastr';

import { configFactory, store_init } from './factories';
import { AnalyticsModule } from './modules/analytics';
import { SeoModule } from './modules/seo';
import { TranslationModule } from './modules/translate';
import { services } from './services';
import { effects } from './store/effects';
import { coreReducers, CORE_FEATURE } from './store/reducers';
import { Injector } from '@angular/core';

// @dynamic
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    CookieModule.forRoot({}),
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: false,
      enableHtml: true,
    }),
    TransferHttpModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    BrowserTransferStateModule,
    ConfigModule.forRoot({}),
    StoreModule.forFeature(CORE_FEATURE, coreReducers),
    EffectsModule.forFeature(effects),
    AnalyticsModule.forRoot([]),
    TranslationModule.forRoot([]),
    SeoModule.forRoot([]),

  ],
  exports: [
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
  ],
  providers: [
    ...services,
    ...shared_services,
    TransferHttpService,
  ],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already  loaded. Import it in the AppModule only.');
    }
  }
  // tslint:disable-next-line:no-any
  static forRoot(configuredProviders: any[]): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...configuredProviders,
        CookieService,
        {
          provide: APP_INITIALIZER, useFactory: store_init, deps: [Store], multi: true,
        },
        {
          provide: ConfigLoader,
          useFactory: configFactory,
          deps: [HttpClient, TransferState, Injector],
        },
        {
          provide: ConsoleService,
          useFactory: () => console,
        },
      ],
    };
  }
}
