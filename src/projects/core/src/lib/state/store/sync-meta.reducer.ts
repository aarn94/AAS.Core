import { Injector } from '@angular/core';
import { CookieService } from '@gorniv/ngx-universal';
import { Action, ActionReducer } from '@ngrx/store';
import * as deepmerge from 'deepmerge';
import { localStorageSync } from 'ngrx-store-localstorage';

import { ISyncSettings } from '../../core/interfaces';
import { SyncCookiesService } from '../services';
import { SYNC_SETTINGS } from '../tokens';

import { serverToBrowserSync } from './server-browser-sync.reducer';

export const mergeReducer = (state: any, rehydratedState: any, action: any): any => {
  if (action.type === '@ngrx/store/update-reducers') {
    return deepmerge(state, rehydratedState);
  }

  return state;
};

export function getMetaReducers (cookie: CookieService, injector: Injector): ActionReducer<any>[] {

  let syncSettings: ISyncSettings = injector.get(SYNC_SETTINGS, {
    keys: [],
    checkStorageAvailability: true,
  });

  if (syncSettings.serverSync) {
    syncSettings = {...syncSettings,
      checkStorageAvailability: false,
      storage: new SyncCookiesService(cookie),
    };
  }

  return [serverToBrowserSync, (reducer: ActionReducer<unknown, Action>): ActionReducer<unknown, Action> => {
    return localStorageSync({
      ...syncSettings,
      mergeReducer,
    })(reducer); }];
}
