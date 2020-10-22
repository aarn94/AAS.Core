/* tslint:disable:no-any */
import { Action, ActionReducer, UPDATE } from '@ngrx/store';

import { StateFromServerToBrowser } from '../functions';

let transferedState: any;
let initialState: any;
let first = true;

export function serverToBrowserSync(reducer: ActionReducer<unknown, Action>): ActionReducer<unknown, Action> {
  // tslint:disable-next-line:typedef
  return function (state: any, action: any) {

    if (action.type === '@ngrx/store/init') {
      transferedState = {...StateFromServerToBrowser.Result_State};
      initialState = {...state};
    }
    // first init contains required initial state from browser with local sync

    if (action.type === '@ngrx/store/update-reducers' && first) {
      first = false;
      initialState = {...state};
    }

    // on "update-reducers" set their initial transfered state
    if (action.type === UPDATE && transferedState && action.features) {
      const features: string[] = (action as any).features;
      const newState = {...state};

      for (const feature of features) {
        if (!newState[feature]) {
          newState[feature] = initialState[feature] ? {...initialState[feature], ...transferedState[feature]} : transferedState[feature];
        }

      }

      return reducer(newState, action);
    }

    return reducer(state, action);
  };
}
