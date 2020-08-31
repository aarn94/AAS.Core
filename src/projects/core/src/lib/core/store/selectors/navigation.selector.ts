import * as fromRouter from '@ngrx/router-store';
import { createSelector, createFeatureSelector } from '@ngrx/store';

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


export const selectRouter = createFeatureSelector<any, fromRouter.RouterReducerState<any>>('router');

export const {
  selectCurrentRoute,   // select the current route
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);
