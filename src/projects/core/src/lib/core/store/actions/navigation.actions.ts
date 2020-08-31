import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export const go = createAction(
    '[Navigation] Go to',
    props<{data: string[], extras?: NavigationExtras}>(),
  );

export const replace = createAction(
    '[Navigation] Go to with replace',
    props<{data: string[], extras?: NavigationExtras}>(),
);

export const forward = createAction(
    '[Navigation] Forward',
);

export const back = createAction(
    '[Navigation] Back',
);

export const setInitialPath = createAction(
  '[Navigation] Set Initial Path',
  props<{data: string[]}>(),
);
