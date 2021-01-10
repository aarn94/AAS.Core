import { forwardRef, Inject, Injectable } from '@angular/core';
import { CookieService } from '@gorniv/ngx-universal';
import { CookieOptions } from '@gorniv/ngx-universal/cookie/cookie-options.model';
import moment from 'moment';

@Injectable()
export class StorageService {

  constructor(@Inject(forwardRef(() => CookieService)) private cookieService: CookieService) {
  }

  storeString(key: string, value: string, expirationTimeInMinutes?: number): void {

    const options: CookieOptions = expirationTimeInMinutes ? {
        expires: moment(new Date()).add(expirationTimeInMinutes, 'm').toDate(),
      } : null;

    this.cookieService.put(key, value, options);
  }

  getString(key: string): string {
    return this.cookieService.get(key);
  }

  remove(key: string): void {
    this.cookieService.remove(key);
  }
}
