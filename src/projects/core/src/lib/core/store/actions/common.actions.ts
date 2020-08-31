import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { IAppError, INotification } from '../../../shared/interfaces';

export const handleException = createAction(
    '[Common] Exception occurred',
    props<{data: HttpErrorResponse}>(),
  );

export const notificationSent = createAction(
    '[Common] Info message sent',
    props<{data: INotification}>(),
  );

export const handleAppException = createAction(
    '[Common] Handle app exception',
    props<{data: IAppError}>(),
  );

export const handleCriticalException = createAction(
    '[Common] Handle critical exception',
    props<{data: string}>(),
);

export const appStarted = createAction(
    '[Common] App started',
  );

export const appStartedSuccess = createAction(
    '[Common] App started success',
  );

export const loadingStarted = createAction(
    '[Common] Loading started',
  );

export const loadingFinished = createAction(
    '[Common] Loading finished',
);

export const modeLoad = createAction(
    '[Common] mode load',
  );

export const modeModified = createAction(
    '[Core] Mode modified',
    props<{data: boolean}>(),
  );

export const modeLoadSuccess = createAction(
    '[Common] Mode load success',
    props<{data: boolean}>(),
  );

export const configLoaded = createAction(
  '[Common] Config loaded',
)
