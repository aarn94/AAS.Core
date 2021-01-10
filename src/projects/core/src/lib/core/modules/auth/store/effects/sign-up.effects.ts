import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';

import { defaultUnAuthorizedRedirectTo, defaultVerificationRoute } from '../../../../../shared/constants';
import { IProps } from '../../../../../state/interfaces';
import { go, handleException, notificationSent } from '../../../../store/actions';
import {
  IConfirmEmailRequest,
  IConfirmPhoneNumberRequest,
  IResendConfirmationEmailRequest,
  IResendConfirmationSmsRequest,
  ISignUpRequest,
} from '../../interfaces';
import { IAuthSettings } from '../../interfaces';
import { AuthenticationService, AuthTextsService } from '../../services';
import { AUTH_SETTINGS } from '../../tokens';
import {
  emailConfirmationStarted, emailSignUpFinished,
  emailSignUpStarted,
  handleEmailConfirmationError,
  phoneConfirmationStarted, phoneSignUpFinished,
  phoneSignUpStarted,
  resendConfirmationEmail,
  resendConfirmationSms,
} from '../actions';
import {  } from '../actions/sign-up.actions';

@Injectable()
export class SignUpEffects {

  onResendConfirmationEmail$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(resendConfirmationEmail),
      exhaustMap((result: IProps<IResendConfirmationEmailRequest>) =>
        this.authService.resendConfirmationEmail(result.data).pipe(
          map((response: unknown) => notificationSent({ data: {
             message: this.authTextsService.getResendSuccessText(),
             title: this.authTextsService.getSuccessText(),
          } })),
          catchError((error: HttpErrorResponse) => of(handleException({ data: error }))),
        ),
      ),
    ),
  );

  onResendConfirmationSms$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(resendConfirmationSms),
      exhaustMap((result: IProps<IResendConfirmationSmsRequest>) =>
        this.authService.resendConfirmationSms(result.data).pipe(
          map((response: unknown) => notificationSent({ data: {
            message: this.authTextsService.getResendSuccessText(),
            title: this.authTextsService.getSuccessText(),
          } })),
          catchError((error: HttpErrorResponse) => of(handleException({ data: error }))),
        ),
      ),
    ),
  );

  onSigNupPhoneStarted$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(phoneSignUpStarted),
      exhaustMap((result: IProps<ISignUpRequest>) =>
        this.authService.signUp(result.data).pipe(
          switchMap(() => of(phoneSignUpFinished(result))),
          catchError((error: HttpErrorResponse) => of(handleException({ data: error }))),
        ),
      ),
    ),
  );

  onSigNupEmailStarted$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(emailSignUpStarted),
      exhaustMap((result: IProps<ISignUpRequest>) =>
        this.authService.signUp(result.data).pipe(
          switchMap(() => of(emailSignUpFinished(result))),
          catchError((error: HttpErrorResponse) => of(handleException({ data: error }))),
        ),
      ),
    ),
  );

  onEmailConfirmationStarted$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(emailConfirmationStarted),
    exhaustMap((result: IProps<IConfirmEmailRequest>) =>
      this.authService.confirmEmail(result.data).pipe(
        switchMap((response: unknown) =>
          [
            notificationSent({ data: {
              message: this.authTextsService.getVerifiedSuccessText(),
              title: this.authTextsService.getSuccessText(),
          } }),
            go({ data: ['/' + this.loginRoute] }),
          ]),
        catchError((error: HttpErrorResponse) => of(handleEmailConfirmationError({ data: { error, email: result.data.email } }))),
      ),
    )));

  onPhoneConfirmationStarted$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(phoneConfirmationStarted),
      exhaustMap((result: IProps<IConfirmPhoneNumberRequest>) =>
        this.authService.confirmPhoneNumber(result.data).pipe(
          switchMap((response: unknown) =>
            [
              notificationSent({
                data: {
                  message: this.authTextsService.getVerifiedSuccessText(),
                  title: this.authTextsService.getSuccessText(),
                },
              }),
              go({ data: ['/' + this.loginRoute] }),
            ]),
          catchError((error: HttpErrorResponse) => of(handleException({ data: error }))),
        ),
      )));
  private loginRoute: string;

  constructor(private actions$: Actions, private authService: AuthenticationService,
              private authTextsService: AuthTextsService,
              @Optional() @Inject(AUTH_SETTINGS) authSettings: IAuthSettings) {
      this.loginRoute = authSettings?.unauthorizedRedirectTo ?? defaultUnAuthorizedRedirectTo;
  }
}
