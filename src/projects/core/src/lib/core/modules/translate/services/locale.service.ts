import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { LogService } from '../../../../core/services/log.service';

// @dynamic
@Injectable()
export class LocaleService {

  constructor(@Optional() @Inject(REQUEST) private request: Request,
              @Inject(PLATFORM_ID) private platformId: Object,
              private log: LogService) {
  }

  getCurrentLocale(): string {
    const language: string = this.detectLanguage();

    return language.indexOf('-') >= 0 ? language.substr(0, language.indexOf('-')) : language;
  }

  private detectLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      this.log.debug('navigator language: ' + navigator.language);

      return navigator.language;
    }

    if (this.request && this.request.headers) {
      this.log.debug('request headers: ');
      this.log.debug(this.request.headers);

      return (this.request.headers['accept-language'] || '').substring(0, 2);
    }

    return 'pl';
  }
}
