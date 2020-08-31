import { createSelector } from '@ngrx/store';

import { ICoreState, selectCore } from '../reducers';
import { INavigationState } from '../reducers/navigation.reducer';

// tslint:disable: typedef

export const selectNavigation = createSelector(
    selectCore,
    (state: ICoreState) => state && state.navigation,
);

export const selectPreviousPath = createSelector(
  selectNavigation,
  (state: INavigationState) => state && state.previousPath,
);

export const selectCurrentPath = createSelector(
  selectNavigation,
  (state: INavigationState) => state && state.currentPath,
);

export const selectCurrentUrl = createSelector(
  selectNavigation,
  (state: INavigationState) => state && state.currentPath?.join('/'),
);

export const selectPreviousUrl = createSelector(
  selectNavigation,
  (state: INavigationState) => state && state.previousPath?.join('/'),
);
