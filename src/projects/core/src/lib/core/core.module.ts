import { CommonModule } from '@angular/common';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { Injector } from '@angular/core';
import { BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { CookieModule, CookieService, TransferHttpModule, TransferHttpService } from '@gorniv/ngx-universal';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { ConfigLoader, ConfigService, CONFIG_FORROOT_GUARD, provideForRootGuard } from '@ngx-config/core';
import { LoadingBarComponent, LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ToastrModule } from 'ngx-toastr';

import { AASSharedModule } from '../shared';

import { configFactory, configInitializerFactory, store_init } from './factories';
import { LanguageInterceptor } from './interceptors';
import { AnalyticsModule } from './modules/analytics';
import { AnalyticsEffects } from './modules/analytics/store/effects';
import { analyticsReducer } from './modules/analytics/store/reducers';
import { AuthModule } from './modules/auth/auth.module';
import { ForgetEffects, LoginEffects, SignUpEffects  } from './modules/auth/store/effects';
import { authReducer } from './modules/auth/store/reducers';
import { SeoModule } from './modules/seo';
import { TranslationModule } from './modules/translate';
import { TranslateEffects } from './modules/translate/store/effects';
import { translateReducer } from './modules/translate/store/reducers';
import { ConsoleService, LoaderService, LogService, NotificationService, RouterService, StorageService, ThemeService, WatchDogService } from './services';
import { CommonEffects } from './store/effects/common.effects';
import { NavigationEffects } from './store/effects/navigation.effects';
import { CORE_FEATURE } from './store/reducers';
import { commonReducer } from './store/reducers/common.reducer';
import { navigationReducer } from './store/reducers/navigation.reducer';
import { ConfirmationService } from './services/confirmation.service';

// @dynamic
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AASSharedModule,
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
    StoreModule.forFeature(CORE_FEATURE, {
      navigation: navigationReducer,
      analytics: analyticsReducer,
      common: commonReducer,
      translate: translateReducer,
      auth: authReducer,
    }),
    EffectsModule.forFeature([
      NavigationEffects,
      CommonEffects,
      AnalyticsEffects,
      TranslateEffects,
      ForgetEffects,
      LoginEffects,
      SignUpEffects,
    ]),
    AnalyticsModule.forRoot([]),
    TranslationModule.forRoot([]),
    SeoModule.forRoot([]),
    AuthModule.forRoot([]),
  ],
  exports: [
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    LoadingBarComponent,
  ],
  providers: [
    StorageService,
    RouterService,
    NotificationService,
    ThemeService,
    LoaderService,
    WatchDogService,
    LogService,
    ConsoleService,
    TransferHttpService,
    ConfirmationService,
  ],
})
export class AASCoreModule {

  constructor(@Optional() @SkipSelf() parentModule: AASCoreModule) {
    if (parentModule) {
      throw new Error('AASCoreModule is already  loaded. Import it in the AppModule only.');
    }
  }
  // tslint:disable-next-line:no-any
  static forRoot(configuredProviders: any[]): ModuleWithProviders<AASCoreModule> {
    return {
      ngModule: AASCoreModule,
      providers: [
        ...configuredProviders,
        ConfigService,
        {
          provide: APP_INITIALIZER,
          useFactory: configInitializerFactory,
          deps: [ConfigService, Store],
          multi: true,
        },
        {
          provide: ConfigLoader,
          useFactory: configFactory,
          deps: [TransferState, Injector],
        },
        {
          provide: CONFIG_FORROOT_GUARD,
          useFactory: provideForRootGuard,
          deps: [[ConfigService, new Optional(), new SkipSelf()]],
        },
        CookieService,
        {
          provide: APP_INITIALIZER, useFactory: store_init, deps: [Store], multi: true,
        },
        {
          provide: ConsoleService,
          useFactory: () => console,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LanguageInterceptor,
          multi: true,
        },
      ],
    };
  }
}

