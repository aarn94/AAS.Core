import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, debounceTime, exhaustMap, filter, map, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { IAASState } from '../../../../state/interfaces';
import { StorageService } from '../../../services';
import { LogService } from '../../../services';
import { selectConfigLoaded } from '../../../store/selectors';
import { AuthToken, IAuthToken, ITokenResponse } from '../interfaces';
import { refreshTokenRemoved, refreshTokenUsed, tokenRemoved } from '../store/actions';
import { selectRefreshToken, selectToken } from '../store/selectors';

import { AuthenticationService } from './authentication.provider';

@Injectable()
export class AuthService {

  userDataKey: string = 't';
  refreshTokenKey: string = 'rkt';

  private isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<AuthToken> = new BehaviorSubject<AuthToken>(null);

  constructor(private store: Store<IAASState>, private storageProvider: StorageService,
              private authenticationService: AuthenticationService, private logService: LogService) {}

  isAuthenticated(): Observable<boolean> {
    return this.getToken().pipe(
      take(1),
      map((token: IAuthToken) => {
        return !!token;
      }));
  }

  getToken(): Observable<IAuthToken> {
    return this.store.select(selectConfigLoaded).
      pipe(filter((initialized: boolean) => initialized),
      take(1),
      switchMap((e: boolean) => {
        this.logService.trace('get token with refreshing', 'auth');

        return this.getTokenWithRefreshing();
        }));
  }

  clearTokens(): void {
    this.storageProvider.remove(this.userDataKey);
    this.storageProvider.remove(this.refreshTokenKey);
  }

  saveToken(accessToken: string, refreshToken: string): void {
    this.storageProvider.storeString(this.userDataKey, accessToken);
    this.storageProvider.storeString(this.refreshTokenKey, refreshToken);
  }

  restoreToken(): IAuthToken {
    const userDataKey: string = this.storageProvider.getString(this.userDataKey);

    if (!userDataKey) {
      return null;
    }

    return new AuthToken(userDataKey);
  }

  restoreRefreshToken(): string {
    const refreshTokenKey: string = this.storageProvider.getString(this.refreshTokenKey);

    return refreshTokenKey;
  }

  private getTokenWithRefreshing(): Observable<IAuthToken> {
    return this.store.select(selectToken).pipe(
      debounceTime(300),
      take(1),
      withLatestFrom(this.store.select(selectRefreshToken)),
      exhaustMap(([value, refreshToken]: [IAuthToken, string]) => {
        this.logService.trace('Get jwt token from store', 'auth');
        this.logService.trace(value, 'auth');
        if (!value && !refreshToken) {
          this.logService.trace('access token and refresh token not exists', 'auth');

          return of(null);
        } else if (value && !value.isExpired()) {
          this.logService.trace('return token', 'auth');

          return of(value);
        } else {
          this.removeTokenIfExpired(value);

          return this.refreshTokenWithWaiting(refreshToken);
        }
      }));
  }

  private removeTokenIfExpired(token: IAuthToken): void {
    if (token?.isExpired()) {
      this.logService.trace('token expired', 'auth');
      this.logService.trace(Date.now(), 'auth');
      this.logService.trace(token.exp * 1000, 'auth');
      this.store.dispatch(tokenRemoved());
      this.storageProvider.remove(this.userDataKey);
    }
  }

  private refreshTokenWithWaiting(refreshToken: string): Observable<IAuthToken> {
    if (refreshToken) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.logService.trace('refreshing token', 'auth');
        return this.useRefreshToken(refreshToken);

      } else {
        this.logService.trace('waiting for refresh token', 'auth');

        return this.refreshTokenSubject.pipe(
          take(2));
      }
    } else {
      this.logService.trace('refresh token not exists', 'auth');

      of(null);
    }
  }

  private useRefreshToken(refreshToken: string): Observable<IAuthToken> {
    return this.authenticationService.useRefreshToken({ refreshToken }).pipe(
      switchMap((value: ITokenResponse) => {
        this.store.dispatch(refreshTokenUsed({ data: value }));
        this.saveToken(value.accessToken, value.refreshToken);

        const authToken: AuthToken = new AuthToken(value.accessToken);

        this.refreshTokenSubject.next(authToken);
        this.isRefreshing = false;

        return of(authToken);
      }),
      catchError((error: unknown) => {
        this.store.dispatch(refreshTokenRemoved());
        this.storageProvider.remove(this.refreshTokenKey);

        return of(null);
      }));
  }
}
