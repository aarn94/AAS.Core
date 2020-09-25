import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';

import { defaultAuthorizationEnabled } from '../../../../shared/constants';
import { LogService } from '../../../services';
import { IAuthSettings, IAuthToken } from '../interfaces';
import { AuthService } from '../services';
import { AUTH_SETTINGS } from '../tokens';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private enabled: boolean;

  constructor(public authService: AuthService, @Optional()
              @Inject(AUTH_SETTINGS) authSettings: IAuthSettings, private logService: LogService) {
    this.enabled = authSettings?.enabled ?? defaultAuthorizationEnabled;
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.logService.trace('Start request', 'auth');
    this.logService.trace(req, 'auth');
    if (!this.enabled) {
      return next.handle(req);
    }

    return this.authService.getToken().pipe(
      take(1),
      switchMap((token: IAuthToken) => {
        this.logService.trace('Token interceptor with token', 'auth');
        this.logService.trace(req, 'auth');
        this.logService.trace(token, 'auth');
        if (token) {
          return this.handleWithUnauthorized(this.addToken(req, token.token), next);
        } else {
          return next.handle(req);
        }
      }),
    );
  }

  private handleWithUnauthorized(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next, error);
      } else {
        return throwError(error);
      }
    }));
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler, error: unknown): Observable<HttpEvent<unknown>> {
    return this.authService.getToken().pipe(
      take(1),
      switchMap((token: IAuthToken) => {
        if (token) {
          return next.handle(this.addToken(request, token.token));
        }
        throwError(error);
      }));
  }

  private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
