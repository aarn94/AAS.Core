import { Location } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

import { defaultTranslateRouterEnabled } from '../../shared/constants/defaults.model';
import { IGo } from '../interfaces';
import { ITranslationSettings } from '../modules/translate/interfaces';
import { TRANSLATION_SETTINGS } from '../modules/translate/tokens';

@Injectable()
export class RouterService {

  private localizeRoutesEnabled: boolean;

  constructor(private router: Router, private location: Location, private localize: LocalizeRouterService,
              @Optional() @Inject(TRANSLATION_SETTINGS)  translateSettings: ITranslationSettings) {
      this.localizeRoutesEnabled = translateSettings?.routerEnabled ?? defaultTranslateRouterEnabled;
     }

  go(data: IGo): void {
    if (!this.localizeRoutesEnabled) {
      this.router.navigate(data.data, data.extras);
    } else {
      const translatedPath: string | any[] = this.localize.translateRoute(data.data);

      if (translatedPath instanceof String) {
        this.router.navigate([translatedPath], data.extras);
      } else {
        this.router.navigate(translatedPath as any[], data.extras);
      }

    }

  }

  goWithReset(data: IGo): void {
    const replaceExtras: NavigationExtras = {
      ...data.extras,
      replaceUrl: true,
  };

    if (!this.localizeRoutesEnabled) {
      this.router.navigate(data.data, replaceExtras);
    }

    const translatedPath: string | any[] = this.localize.translateRoute(data.data);

    if (translatedPath instanceof String) {
      this.router.navigate([translatedPath], data.extras);
    } else {
      this.router.navigate(translatedPath as any[], data.extras);
    }
  }

  forward(): void {
    this.location.forward();
  }

  backward(): void {
    this.location.back();
  }
}
