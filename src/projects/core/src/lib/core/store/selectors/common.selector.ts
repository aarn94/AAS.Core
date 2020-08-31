import { createSelector } from '@ngrx/store';

import { ICoreState, selectCore } from '../reducers';
import { ICommonState } from '../reducers/common.reducer';

// tslint:disable: typedef

export const selectCommon = createSelector(
    selectCore,
    (state: ICoreState) => state && state.common,
    );

export const selectInitialized = createSelector(
    selectCommon,
  (state: ICommonState) => state ? state.appInitialized : false,
  );

export const selectLoading = createSelector(
    selectCommon,
    (state: ICommonState) => state ? state.loading : false,
 );

export const selectTheme = createSelector(
    selectCommon,
  (state: ICommonState) => state ? state.darkMode : false,
);

export const selectConfigLoaded = createSelector(
  selectCommon,
(state: ICommonState) => state ? state.configLoaded : false,
);
