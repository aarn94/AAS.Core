import { createAction } from '@ngrx/store';

export const initAnalytics = createAction(
    '[Analytics] Init analytics',
  );

export const analyticsLoaded = createAction(
    '[Analytics] Init analytics finished',
);
