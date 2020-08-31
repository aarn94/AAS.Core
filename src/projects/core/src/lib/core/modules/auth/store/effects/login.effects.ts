import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { defaultAuthorizedRedirectTo, defaultEmailVerificationRoute, defaultPhoneVerificationRoute, defaultUnAuthorizedRedirectTo } from '../../../../../shared/constants';
import { IAppError, isAppError } from '../../../../../shared/interfaces';
import { IProps } from '../../../../../state/interfaces';
import { go, handleAppException, handleCriticalException } from '../../../../store/actions';
import { IAuthSettings, IAuthToken, ISignInRequest, ITokenResponse, ILoginError, IRepeatConfirmationProcessRequest } from '../../interfaces';
import { AuthenticationService, AuthService, AuthTextsService } from '../../services';
import { AUTH_SETTINGS } from '../../tokens';
import { loginFailed,
   loginInit,
   loginRestored,
   loginSuccess,
   logout,
   refreshTokenRestored,
   repeatConfirmationProcess,
   resendConfirmationSms,
   restoreLogin,
   restoreLoginFailed ,
   restoreRefreshTokenFailed,
  } from '../actions';
import { resendConfirmationEmail } from '../actions/sign-up.actions';

@Injectable()
export class LoginEffects {
  initLogin$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
        ofType(loginInit),
        exhaustMap((result: IProps<ISignInRequest>) =>
          this.authenticationService.signIn(result.data).pipe(
            map((response: ITokenResponse) => loginSuccess({ data: response })),
            catchError((error: HttpErrorResponse) => {
              return of(loginFailed({ data: { error, login: result.data.login } }));
            }),
          ),
        ),
      ),
    );

  loginSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      exhaustMap((result: IProps<ITokenResponse>) => {
        this.authService.saveToken(result.data.accessToken, result.data.refreshToken);

        return of(go({ data: ['/' + this.homeRoute] }));
      },
      ),
    ));

    logout$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      exhaustMap(() => {
        this.authService.clearTokens();

        return of(go({ data: ['/' + this.loginRoute] }));
      },
      ),
    ));

    onLoginRestore$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(restoreLogin),
        exhaustMap(() => {
            const authToken: IAuthToken = this.authService.restoreToken();

            if (authToken) {
              return of(loginRestored({data: authToken}));
            }

            return of(restoreLoginFailed());
        }),
      ),
    );

    onRefreshTokenRestore$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(restoreLogin),
        exhaustMap(() => {
            const refreshToken: string = this.authService.restoreRefreshToken();

            if (refreshToken) {
              return of(refreshTokenRestored({data: refreshToken}));
            }

            return of(restoreRefreshTokenFailed());
        }),
      ),
    );

    onHandleLoginError$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loginFailed),
      exhaustMap((result: IProps<ILoginError>) => {
        if (isAppError(result.data.error.error)) {
          const errorCode: string = (result.data.error.error as IAppError).code;

          if (errorCode === 'account_not_confirmed_by_mail') {
            return of(go({ data: ['/' + this.emailVerificationRoute],
              extras: { queryParams: { email: result.data.login } }}));
         } else if (errorCode === 'account_not_confirmed_by_phone') {
          return of(go({ data: ['/' + this.phoneVerificationRoute],
              extras: { queryParams: { phone: result.data.login }}}));
         } else {
          return of(handleAppException({ data: result.data.error.error }));
         }
        }

        return of(handleCriticalException({ data: this.authTextsService.getCommunicationProblemText() }));
      }),
    ));

    onRepeatConfirmationProcess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(repeatConfirmationProcess),
      exhaustMap((result: IProps<IRepeatConfirmationProcessRequest>) => {

        if (result.data.email) {
          return [
            resendConfirmationEmail({data: {email: result.data.email}}),
            go({
              data: ['/' + this.emailVerificationRoute],
              extras: { queryParams: { email: result.data.email } },
            }),
          ];
        } else if (result.data.phone) {
          return [
            resendConfirmationSms({data: {phone: result.data.phone}}),
            go({
              data: ['/' + this.phoneVerificationRoute],
              extras: { queryParams: { phone: result.data.phone } },
            }),
          ];
        }

        return of(go({ data: ['/' + this.loginRoute] }));
      }),
    ));

  private homeRoute: string;
  private loginRoute: string;
  private phoneVerificationRoute: string;
  private emailVerificationRoute: string;

  constructor(private actions$: Actions, private authenticationService: AuthenticationService,
              private authService: AuthService, private authTextsService: AuthTextsService,
              @Optional() @Inject(AUTH_SETTINGS) authSettings: IAuthSettings) {
          this.homeRoute = authSettings?.authorizedRedirectTo ?? defaultAuthorizedRedirectTo;
          this.loginRoute = authSettings?.unauthorizedRedirectTo ?? defaultUnAuthorizedRedirectTo;
          this.phoneVerificationRoute = authSettings?.phoneVerificationRoute ?? defaultPhoneVerificationRoute;
          this.emailVerificationRoute = authSettings?.emailVerificationRoute ?? defaultEmailVerificationRoute;
  }
}
