import { createAction, props } from '@ngrx/store';

export const languageload = createAction(
  '[Translate] Language load',
);

export const languageloadSuccess = createAction(
  '[Translate] Language load success',
  props<{data: string}>(),
);

export const languageModified = createAction(
  '[Translate] Language modified',
  props<{data: string}>(),
);
