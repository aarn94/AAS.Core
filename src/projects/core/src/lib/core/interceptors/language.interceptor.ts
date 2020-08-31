import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { IAASState } from '../../state/interfaces';
import { selectLanguage } from '../modules/translate/store/selectors';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

  constructor(private store: Store<IAASState>) {
  }
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(selectLanguage).pipe(
      take(1),
      switchMap((language: string) => {
        if (language) {
          return next.handle(this.addLanguage(req, language));
        } else {
          return next.handle(req);
        }
      }),
    );
  }

  private addLanguage(request: HttpRequest<unknown>, language: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Language: language,
      },
    });
  }
}
