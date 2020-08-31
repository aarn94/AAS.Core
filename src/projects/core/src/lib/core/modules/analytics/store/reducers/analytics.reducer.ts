import { Action, createReducer, on } from '@ngrx/store';

import { analyticsLoaded } from '../actions';

export interface IAnalyticsState {
  analyticsInitialized: boolean;
}

const initialState: IAnalyticsState = {
    analyticsInitialized: true,
};

const _analyticsReducer = createReducer(
    initialState,
    on(analyticsLoaded, (state: IAnalyticsState) => {
      return {...state, analyticsInitialized:  true };
    }),
  );

export function analyticsReducer(state: IAnalyticsState, action: Action): IAnalyticsState {
    return _analyticsReducer(state, action) as IAnalyticsState;
  }

export const analyticsnInitialState = initialState;
