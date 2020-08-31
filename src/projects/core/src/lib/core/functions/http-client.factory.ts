import {
  HttpBackend,
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injector, Type } from '@angular/core';
import { Observable } from 'rxjs';

class HttpInterceptorHandler implements HttpHandler {
  constructor(private next: HttpHandler, private interceptor: HttpInterceptor) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(req, this.next);
  }
}

class HttpInterceptingHandler implements HttpHandler {
  private chain: HttpHandler | null = null;

  constructor(
    private backend: HttpBackend,
    private injector: Injector,
    private interceptorsToExclude: Type<HttpInterceptor>[],
    private intercept?: (req: HttpRequest<any>) => HttpRequest<any>,
  ) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.intercept) {
      req = this.intercept(req);
    }

    if (this.chain === null) {
      const interceptors = this.injector
        .get(HTTP_INTERCEPTORS, [])
        .filter(
          interceptor => !this.interceptorsToExclude
          .some((interceptorType: Type<HttpInterceptor>) => interceptor instanceof interceptorType),
        );

      this.chain = interceptors.reduceRight(
        (next: HttpBackend, interceptor: HttpInterceptor) => new HttpInterceptorHandler(next, interceptor),
        this.backend,
      );
    }

    return this.chain.handle(req);
  }
}

export function createHttpClient(
  injector: Injector,
  excludedInterceptors: Type<HttpInterceptor>[],
  intercept?: (req: HttpRequest<any>) => HttpRequest<any>,
) {
  return new HttpClient(
    new HttpInterceptingHandler(injector.get(HttpBackend), injector, excludedInterceptors, intercept),
  );
}
