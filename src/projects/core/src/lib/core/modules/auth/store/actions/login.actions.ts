import { createAction, props } from '@ngrx/store';

import { IAuthToken, ILoginError, IRepeatConfirmationProcessRequest, ISignInRequest, ITokenResponse } from '../../interfaces';

export const loginInit = createAction(
  '[Auth] Login initialized',
  props < {data: ISignInRequest, callbackUrl?: string}>(),
);

export const restoreLogin = createAction(
  '[Auth] Restore login',
);

export const tokenRemoved = createAction(
  '[Auth] Remove token',
);

export const refreshTokenRemoved = createAction(
  '[Auth] Remove refresh token',
);

export const loginRestored = createAction(
  '[Auth] Login restored',
  props<{data: IAuthToken}>(),
);

export const restoreLoginFailed = createAction(
  '[Auth] Restore login failed',
);

export const restoreRefreshToken = createAction(
  '[Auth] Restore refresh token',
);

export const refreshTokenRestored = createAction(
  '[Auth] Refresh token restored',
  props<{data: string}>(),

);

export const refreshTokenUsed = createAction(
  '[Auth] Refresh token used',
  props<{data: ITokenResponse}>(),

);

export const restoreRefreshTokenFailed = createAction(
  '[Auth] Restore refresh token failed',
);

export const loginFailed = createAction(
  '[Auth] Login processing failed',
  props <{data: ILoginError}>(),
);

export const loginSuccess = createAction(
  '[Auth] Login processing success',
  props <{data: ITokenResponse, callbackUrl?: string}>(),
);

export const loginCompleted = createAction(
  '[Auth] Login completed',
);

export const logout = createAction(
  '[Auth] Logout',
  props <{callbackUrl?: string}>(),
);

export const repeatConfirmationProcess = createAction(
  '[Auth] Repeat confirmation process',
  props <{data: IRepeatConfirmationProcessRequest}>(),
);
