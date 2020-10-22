import { CommonModule } from '@angular/common';
import { Injector, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CookieService } from '@gorniv/ngx-universal';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, USER_PROVIDED_META_REDUCERS } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { getInitialState } from './functions';
import { DataStoreEffects, getMetaReducers } from './store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      router: routerReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
        initialState: getInitialState,
        metaReducers: [
        ],
      },
    ),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: true,
    }),
    EffectsModule.forRoot([DataStoreEffects]),
    EntityDataModule.forRoot({}),
  ],
})
export class StateModule {

  constructor(@Optional() @SkipSelf() parentModule: StateModule) {
    if (parentModule) {
      throw new Error('StateModule is already  loaded. Import it in the AppModule only.');
    }
  }
  // tslint:disable-next-line:no-any
  static forRoot(configuredProviders: any[]): ModuleWithProviders<StateModule> {
    return {
      ngModule: StateModule,
      providers: [...configuredProviders,
        {
          provide: USER_PROVIDED_META_REDUCERS,
          deps: [CookieService, Injector],
          useFactory: getMetaReducers,
        },
      ],
    };
  }
}
