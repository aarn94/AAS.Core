import { Action, createReducer, on } from '@ngrx/store';

import { COMMON_ACTIONS } from '../actions';

export interface ICommonState {
    appInitialized: boolean;
    loading: boolean;
    darkMode: boolean;
 }

const initialState: ICommonState = {
    appInitialized: false,
    loading: false,
    darkMode: false,
};

const _commonReducer = createReducer(
    initialState,
    on(COMMON_ACTIONS.appStartedSuccess, (state: ICommonState) => {
      return {...state, appInitialized: true};
    }),
    on(COMMON_ACTIONS.loadingStarted, (state: ICommonState) => {
      return {...state, loading: true};
    }),
    on(COMMON_ACTIONS.loadingFinished, (state: ICommonState) => {
      return {...state, loading: false};
    }),
  );

export function commonReducer(state: ICommonState, action: Action): ICommonState {
    return _commonReducer(state, action) as ICommonState;
}

export const commonInitialState = initialState;
