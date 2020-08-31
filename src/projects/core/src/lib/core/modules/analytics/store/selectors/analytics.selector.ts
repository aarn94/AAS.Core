import { createSelector } from '@ngrx/store';

import { ICoreState, selectCore } from '../../../../store/reducers';

export const initializedAnalytics = createSelector(
    selectCore,
    (state: ICoreState) => state && state.analytics ? state.analytics.analyticsInitialized : false,
);
