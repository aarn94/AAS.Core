import { createSelector } from '@ngrx/store';

import { ICoreState, selectCore } from '../../../../store/reducers';

export const selectLanguage = createSelector(
    selectCore,
    (state: ICoreState) => state && state.translate ? state.translate.language : false,
);
