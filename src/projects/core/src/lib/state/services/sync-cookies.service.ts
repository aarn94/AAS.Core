import { Injectable } from '@angular/core';
import { CookieService } from '@gorniv/ngx-universal';

@Injectable()
export class SyncCookiesService implements Storage {

  [name: string]: unknown;

  length: number;

  constructor(private readonly cookie: CookieService) {
  }

  clear(): void {
    this.cookie.removeAll();
    this.length = 0;
  }

  getItem(key: string): string | null {
    return this.cookie.get(key);
  }

  key(index: number): string | null {
    return null;
  }

  removeItem(key: string): void {
    this.cookie.remove(key);
  }

  setItem(key: string, value: string): void {
    this.cookie.put(key, value);
  }

}
