import { Action, createReducer, on } from '@ngrx/store';

import { appStartedSuccess, configLoaded, loadingFinished, loadingStarted } from '../actions';

export interface ICommonState {
    appInitialized: boolean;
    loading: boolean;
    darkMode: boolean;
    configLoaded: boolean;
 }

const initialState: ICommonState = {
    appInitialized: false,
    loading: false,
    darkMode: false,
    configLoaded: false,
};

const _commonReducer = createReducer(
    initialState,
    on(appStartedSuccess, (state: ICommonState) => {
      return {...state, appInitialized: true};
    }),
    on(loadingStarted, (state: ICommonState) => {
      return {...state, loading: true};
    }),
    on(loadingFinished, (state: ICommonState) => {
      return {...state, loading: false};
    }),
    on(configLoaded, (state: ICommonState) => {
      return {...state, configLoaded: true};
    }),
  );

export function commonReducer(state: ICommonState, action: Action): ICommonState {
    return _commonReducer(state, action) as ICommonState;
}

export const commonInitialState = initialState;
