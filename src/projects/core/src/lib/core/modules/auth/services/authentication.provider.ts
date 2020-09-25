import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfigService } from '@ngx-config/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { defaultAuthorizationEnabled, defaultAuthorizedRedirectTo, defaultUnAuthorizedRedirectTo } from '../../../../shared/constants';
import { getAnonymousOptions, getOptions } from '../../../../shared/functions';
import { IAASState } from '../../../../state/interfaces/app-state.interface';
import { loadingFinished, loadingStarted } from '../../../store/actions';
import {
  IAuthSettings,
  IConfirmEmailRequest,
  IConfirmPhoneNumberRequest,
  IForgetPasswordRequest,
  IMeResponse,
  IResendConfirmationEmailRequest,
  IResendConfirmationSmsRequest,
  IResetPasswordRequest,
  IRevokeAccessTokenRequest,
  IRevokeRefreshTokenRequest,
  ISignInRequest,
  ISignUpRequest,
  ITokenResponse,
  IUseRefreshTokenRequest } from '../interfaces';
import { AUTH_SETTINGS } from '../tokens/index';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private store: Store<IAASState>,
              private readonly config: ConfigService, @Optional() @Inject(AUTH_SETTINGS) private authSettings: IAuthSettings) {
    if (!this.authSettings) {
      this.authSettings = {
        enabled: defaultAuthorizationEnabled,
        url : null,
        urlPlace : null,
        authorizedRedirectTo: defaultAuthorizedRedirectTo,
        unauthorizedRedirectTo: defaultUnAuthorizedRedirectTo,
      };
    }
  }

  me(): Observable<IMeResponse> {
    return this.httpClient.get<IMeResponse>(this.getUrl() + 'me');
  }

  signIn(request: ISignInRequest): Observable<ITokenResponse> {
    this.store.dispatch(loadingStarted());

    return this.httpClient.post<ITokenResponse>(
      this.getUrl() + 'sign-in',
      request,
      getAnonymousOptions(),
    ).pipe(
      finalize(() => this.store.dispatch(loadingFinished())),
    );
  }

  revokeAccessToken(request: IRevokeAccessTokenRequest): Observable<unknown> {
    return this.httpClient.post(
      this.getUrl() + 'access-tokens/revoke',
      request,
      getOptions(),
    );
  }

  useRefreshToken(request: IUseRefreshTokenRequest): Observable<ITokenResponse> {
    return this.httpClient.post<ITokenResponse>(
      this.getUrl() + 'refresh-tokens/use',
      request,
      getOptions(),
    );
  }

  revokeRefreshToken(request: IRevokeRefreshTokenRequest): Observable<unknown> {
    return this.httpClient.post<ITokenResponse>(
      this.getUrl() + 'refresh-tokens/revoke',
      request,
      getOptions(),
    );
  }

  signUp(request: ISignUpRequest): Observable<unknown> {

    this.store.dispatch(loadingStarted());

    return this.httpClient.post(
      this.getUrl() + 'sign-up',
      request,
      getAnonymousOptions(),
    ).pipe(
      finalize(() => this.store.dispatch(loadingFinished())),
    );
  }

  confirmPhoneNumber(request: IConfirmPhoneNumberRequest): Observable<unknown> {
    this.store.dispatch(loadingStarted());

    return this.httpClient.post(
      this.getUrl() + 'confirm-phone-number',
      request,
      getAnonymousOptions(),
    ).pipe(
      finalize(() => this.store.dispatch(loadingFinished())),
    );
  }

  confirmEmail(request: IConfirmEmailRequest): Observable<unknown> {
    this.store.dispatch(loadingStarted());

    return this.httpClient.post(
      this.getUrl() + 'confirm-email',
      request,
      getAnonymousOptions(),
    ).pipe(
      finalize(() => this.store.dispatch(loadingFinished())),
    );
  }

  resendConfirmationEmail(request: IResendConfirmationEmailRequest): Observable<unknown> {
    this.store.dispatch(loadingStarted());

    return this.httpClient.post(
      this.getUrl() + 'resend-confirmation-email',
      request,
      getAnonymousOptions(),
    ).pipe(
      finalize(() => this.store.dispatch(loadingFinished())),
    );
  }

  resendConfirmationSms(request: IResendConfirmationSmsRequest): Observable<unknown> {
    this.store.dispatch(loadingStarted());

    return this.httpClient.post(
      this.getUrl() + 'resend-confirmation-sms',
      request,
      getAnonymousOptions(),
    ).pipe(
      finalize(() => this.store.dispatch(loadingFinished())),
    );
  }

  forgetPassword(request: IForgetPasswordRequest): Observable<unknown> {
    this.store.dispatch(loadingStarted());

    return this.httpClient.post(
      this.getUrl() + 'forget-password',
      request,
      getAnonymousOptions(),
    ).pipe(
      finalize(() => this.store.dispatch(loadingFinished())),
    );
  }

  resetPassword(request: IResetPasswordRequest): Observable<unknown> {
    this.store.dispatch(loadingStarted());

    return this.httpClient.post(
      this.getUrl() + 'reset-password',
      request,
      getAnonymousOptions(),
    ).pipe(
      finalize(() => this.store.dispatch(loadingFinished())),
    );
  }

  private getUrl(): string {
    if (this.authSettings.urlPlace === 'config') {
      return this.config.getSettings(this.authSettings.url);
    } else {
      return this.authSettings.url;
    }
  }
}
