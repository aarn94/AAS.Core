import { ICommonState } from '../../core/store/reducers/common.reducer';
import { defaultAppState, IAASState } from '../interfaces';

import { differenceObject } from './difference-object.function';
declare var window: any;

export function getInitialState(): IAASState {
    if (typeof window !== 'undefined' && window.__STATE__ !== 'undefined') {

      if (window.__STATE__?.core?.common) {
        window.__STATE__.core.common = {
          ...window.__STATE__.core.common,
          loading: true,
          appInitialized: false,
          configLoaded: false,
        } as ICommonState;

        if (window.__STATE__?.core?.analytics) {
          window.__STATE__.core.analytics.analyticsInitialized = false;
        }

        if (window.__STATE__?.router) {
          window.__STATE__.router = null;
        }
      }

      StateFromServerToBrowser.Original_State = window.__STATE__;
      let originalState: any = {
        ...window.__STATE__,
        ...StateFromServerToBrowser.Defaults,
      };

      if (StateFromServerToBrowser.ExcludeFromMapping) {
        originalState = differenceObject(originalState, StateFromServerToBrowser.ExcludeFromMapping);
      }

      StateFromServerToBrowser.Result_State = originalState;

      return originalState;
    } else {
      return defaultAppState;
    }
}

export class StateFromServerToBrowser {
  static Original_State: any = null;
  static Result_State: any = {};

  static Defaults: any = null;
  static ExcludeFromMapping: any = null;
}
