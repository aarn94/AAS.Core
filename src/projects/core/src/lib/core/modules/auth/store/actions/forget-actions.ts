import { createAction, props } from '@ngrx/store';

import { IForgetPasswordRequest, IResetPasswordRequest } from '../../interfaces';

export const phoneForgetPasswordStarted = createAction(
  '[Auth] Forget password by phone started',
  props< {data: IForgetPasswordRequest}>(),
);

export const emailForgetPasswordStarted = createAction(
  '[Auth] Forget password by email started',
  props< {data: IForgetPasswordRequest}>(),
);

export const resetPassword = createAction(
  '[Auth] Reset password',
  props< {data: IResetPasswordRequest}>(),
);
