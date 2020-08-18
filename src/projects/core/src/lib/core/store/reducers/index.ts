import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { commonInitialState, commonReducer, ICommonState } from './common.reducer';
import { INavigationState, navigationInitialState, navigationReducer } from './navigation.reducer';
import { IAnalyticsState, analyticsnInitialState, analyticsReducer } from '../../modules/analytics/store/reducers';
import { ITranslateState, translateInitialState, translateReducer } from '../../modules/translate/store/reducers';

export interface ICoreState {
    navigation: INavigationState;
    analytics: IAnalyticsState;
    common: ICommonState;
    translate: ITranslateState;
}

export const coreInitialState: ICoreState = {
  navigation: navigationInitialState,
  common: commonInitialState,
  analytics: analyticsnInitialState,
  translate: translateInitialState,
};

export const CORE_FEATURE: string = 'core';

export const coreReducers: ActionReducerMap<ICoreState> = {
    navigation: navigationReducer,
    analytics: analyticsReducer,
    common: commonReducer,
    translate: translateReducer,
  };

export const selectCore = createFeatureSelector<ICoreState>(CORE_FEATURE);
