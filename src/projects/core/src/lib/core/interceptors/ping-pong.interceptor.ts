import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AnonymousRequestsProvider } from '../services';

@Injectable()
export class PingPongInterceptor implements HttpInterceptor {

  constructor(private anonymousProvider: AnonymousRequestsProvider) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: !this.anonymousProvider.isAnonymous(request.url),
      setHeaders: {
        'X-PINGOVER': `pingpong`,
      },
    });

    return next.handle(request);
  }
}
