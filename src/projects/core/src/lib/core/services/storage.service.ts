import { forwardRef, Inject, Injectable } from '@angular/core';
import { CookieService } from '@gorniv/ngx-universal';

@Injectable()
export class StorageService {

  constructor(@Inject(forwardRef(() => CookieService)) private cookieService: CookieService) {
  }

  storeString(key: string, value: string): void {
    this.cookieService.put(key, value);
  }

  getString(key: string): string {
    return this.cookieService.get(key);
  }

  remove(key: string): void {
    this.cookieService.remove(key);
  }
}
