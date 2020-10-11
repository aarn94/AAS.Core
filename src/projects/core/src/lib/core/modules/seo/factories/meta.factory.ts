import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Injector } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

import { defaultBrowserAssetsPath, defaultSeoUrl, defaultServerAssetsPath } from '../../../../shared/constants';
import { IAssetsSettings } from '../../../interfaces';
import { ASSETS_SETTINGS } from '../../../tokens';
import { IMetaInitSettings, ISeoSettings } from '../interfaces';
import { MetaInitService } from '../services';
import { META_SETTINGS, SEO_SETTINGS } from '../tokens';

function getText(translate: TranslateService, config: ConfigService, text: string): Observable<string> | string {
  if (text.startsWith('http')) {
    return text;
  }

  // routing
  if (text.startsWith('/')) {
    return text;
  }

  return translate.get(config.getSettings(text, text));
}

// tslint:disable-next-line:typedef
export const metaFactory = (config: ConfigService, translate: TranslateService, metaInit: MetaInitService, injector: Injector) => {

  const settings: ISeoSettings = injector.get(SEO_SETTINGS, null);
  const baseUrl: string = settings?.baseUrl ?? defaultSeoUrl;
  const meta: IMetaInitSettings = injector.get(META_SETTINGS, {
    pageTitleSeparator: ' - ',
    applicationName: 'system.applicationName',
    applicationUrl: baseUrl,
    defaults: {
      // tslint:disable-next-line:object-literal-key-quotes
      title: 'system.applicationName',
      'robots': 'INDEX, FOLLOW',
      // tslint:disable-next-line:object-literal-key-quotes
      description: 'seo.defaultMetaDescription',
      // tslint:disable-next-line:object-literal-key-quotes
      generator: 'seo.generator',
      'og:site_name': 'system.applicationName',
      'og:type': 'seo.type',
    },
  });

  if (settings?.logoPathInAssets && settings?.baseUrl) {

    const url: string = `${settings.baseUrl}${settings.logoPathInAssets}`;

    meta.defaults['og:image'] = url;
    if (url.indexOf('https') > -1) {
      meta.defaults['og:image:secure_url'] = url;
    }

    if (settings?.fbId) {
      meta.defaults['fb:app_id'] = settings.fbId;
    }
  }

  return new MetaStaticLoader({
    ...meta,
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    callback: (cur: string) => {
      return metaInit.shouldDelay(cur) ?
      of(cur).pipe(
        delay(1000),
        switchMap((text: string) => {

          metaInit.disableDelay();

          return getText(translate, config, text);
        })) :
        getText(translate, config, cur);
    },
  });
};
