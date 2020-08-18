import { ConfigService } from '@ngx-config/core';
import { MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

import { MetaInitService } from '../services';
import { Injector } from '@angular/core';
import { ISeoSettings } from '../interfaces';
import { SEO_SETTINGS } from '../tokens';
import { defaultSeoUrl } from '../../../../defaults.model';

function getText(translate: TranslateService, config: ConfigService, text: string): Observable<string> | string {
  if (text.startsWith('http')) {
    return text;
  }

  // routing
  if (text.startsWith('/')) {
    return text;
  }

  return translate.get(config.getSettings(text));
}

// tslint:disable-next-line:typedef
export const metaFactory = (config: ConfigService, translate: TranslateService, metaInit: MetaInitService, injector: Injector) => {

  const settings: ISeoSettings = injector.get(SEO_SETTINGS);

  return new MetaStaticLoader({
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
    pageTitlePositioning: PageTitlePositioning.AppendPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: 'system.applicationName',
    applicationUrl: settings?.baseUrl ?? defaultSeoUrl,
    defaults: {
      // tslint:disable-next-line:object-literal-key-quotes
      title: 'system.applicationName',
      // tslint:disable-next-line:object-literal-key-quotes
      description: 'seo.defaultMetaDescription',
      // tslint:disable-next-line:object-literal-key-quotes
      generator: 'seo.generator',
      'og:site_name': 'system.applicationName',
      'og:type': 'seo.type',
    },
  });
};
