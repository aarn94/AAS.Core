import { createAction, props } from '@ngrx/store';

import {
  IConfirmEmailRequest,
  IConfirmPhoneNumberRequest,
  IEmailConfirmationError,
  IResendConfirmationEmailRequest,
  IResendConfirmationSmsRequest,
  ISignUpRequest,
} from '../../interfaces';

// tslint:disable:typedef
export const emailSignUpStarted = createAction(
  '[Auth] Email signUp started',
  props<{ data: ISignUpRequest }>(),
);

export const emailSignUpFinished = createAction(
  '[Auth] Email signUp finished',
  props<{ data: ISignUpRequest }>(),
);

export const phoneSignUpStarted = createAction(
  '[Auth] Phone signUp started',
  props<{ data: ISignUpRequest }>(),
);

export const phoneSignUpFinished = createAction(
  '[Auth] Phone signUp finished',
  props<{ data: ISignUpRequest }>(),
);

export const emailConfirmationStarted = createAction(
  '[Auth] Email confirmation started',
  props<{ data: IConfirmEmailRequest }>(),
);

export const handleEmailConfirmationError = createAction(
  '[Auth] Handle email confirmation error',
  props<{ data: IEmailConfirmationError }>(),
);

export const resendConfirmationEmail = createAction(
  '[Auth] Resend confirmation email',
  props<{ data: IResendConfirmationEmailRequest }>(),
);

export const phoneConfirmationStarted = createAction(
  '[Auth] Phone confirmation started',
  props<{ data: IConfirmPhoneNumberRequest }>(),
);

export const resendConfirmationSms = createAction(
  '[Auth] Resend confirmation sms',
  props<{ data: IResendConfirmationSmsRequest }>(),
);
