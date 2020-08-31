import { createSelector } from '@ngrx/store';

import { ICoreState, selectCore } from '../../../../store/reducers';

export const selectToken = createSelector(
  selectCore,
  (state: ICoreState) => state?.auth?.accessToken,
);

export const selectRefreshToken = createSelector(
  selectCore,
  (state: ICoreState) => state?.auth?.refreshToken,
);

export const selectAuthInitialized = createSelector(
  selectCore,
  (state: ICoreState) => state?.auth?.initialized,
);
