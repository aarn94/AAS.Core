import { createFeatureSelector } from '@ngrx/store';

import { IAnalyticsState } from '../../modules/analytics/store/reducers';
import { IAuthState } from '../../modules/auth/store/reducers/auth.reducer';
import { ITranslateState } from '../../modules/translate/store/reducers';

import { ICommonState } from './common.reducer';
import { INavigationState } from './navigation.reducer';

export interface ICoreState {
    navigation: INavigationState;
    analytics: IAnalyticsState;
    common: ICommonState;
    translate: ITranslateState;
    auth: IAuthState;
}
export const CORE_FEATURE: string = 'core';

export const selectCore = createFeatureSelector<ICoreState>(CORE_FEATURE);
