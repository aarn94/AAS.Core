import { createSelector } from '@ngrx/store';
import { selectCore, ICoreState } from '../../../../store/reducers';

export const selectInitialized = createSelector(
    selectCore,
    (state: ICoreState) => state && state.analytics ? state.analytics.analyticsInitialized : false,
);
