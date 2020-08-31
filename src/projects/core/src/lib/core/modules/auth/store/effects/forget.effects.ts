import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';

import { defaultResetPasswordEmailRoute, defaultResetPasswordPhoneRoute, defaultUnAuthorizedRedirectTo } from '../../../../../shared/constants';
import { IProps } from '../../../../../state/interfaces';
import { go, handleException, notificationSent } from '../../../../store/actions';
import { IAuthSettings, IForgetPasswordRequest, IResetPasswordRequest } from '../../interfaces';
import { AuthenticationService, AuthTextsService } from '../../services';
import { AUTH_SETTINGS } from '../../tokens';
import { emailForgetPasswordStarted, phoneForgetPasswordStarted, resetPassword } from '../actions';

@Injectable()
export class ForgetEffects {
  onEmailForgetPassword$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
      ofType(emailForgetPasswordStarted),
      exhaustMap((result: IProps<IForgetPasswordRequest>) =>
        this.authService.forgetPassword(result.data).pipe(
          map((response: unknown) => go({
            data: ['/' + this.resetPasswordEmailRoute],
            extras: {queryParams: {email: result.data.email}}})),
          catchError((error: HttpErrorResponse) => of(handleException({ data: error }))),
        ),
      ),
    ),
  );

  onPhoneForgetPassword$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
      ofType(phoneForgetPasswordStarted),
      exhaustMap((result: IProps<IForgetPasswordRequest>) =>
        this.authService.forgetPassword(result.data).pipe(
          map((response: unknown) => go({
            data: ['/' + this.resetPasswordPhoneRoute],
            extras: {queryParams: {phone: result.data.phone}}})),
          catchError((error: HttpErrorResponse) => of(handleException({ data: error }))),
        ),
      ),
    ),
  );

  onResetPassword$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
      ofType(resetPassword),
      exhaustMap((result: IProps<IResetPasswordRequest>) =>
        this.authService.resetPassword(result.data).pipe(
          switchMap((response: unknown) => [
            notificationSent({data: {
               message: this.authTextsService.getPasswordChangedText(),
               title: this.authTextsService.getSuccessText(),
            } }),
            go({data: ['/' + this.loginRoute]}),
          ]),
          catchError((error: HttpErrorResponse) => of(handleException({ data: error }))),
        ),
      ),
    ),
  );

  private loginRoute: string;
  private resetPasswordEmailRoute: string;
  private resetPasswordPhoneRoute: string;

  constructor(private actions$: Actions, private authService: AuthenticationService,
              private authTextsService: AuthTextsService,
              @Optional() @Inject(AUTH_SETTINGS) authSettings: IAuthSettings) {
          this.loginRoute = authSettings?.unauthorizedRedirectTo ?? defaultUnAuthorizedRedirectTo;
          this.resetPasswordPhoneRoute = authSettings?.resetPasswordPhoneRoute ?? defaultResetPasswordPhoneRoute;
          this.resetPasswordEmailRoute = authSettings?.resetPasswordEmailRoute ?? defaultResetPasswordEmailRoute;
  }

}
