
import { Injectable } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { LogService, StorageService } from '../../../services';
import { AnalyticsService } from '../../analytics/services';
import { SeoService } from '../../seo/services';
import { IConfLocale } from '../interfaces';

import { LocaleService } from './locale.service';

@Injectable()
export class InternalizationService {

  private langKey: string = 'currentLanguage';
  private traceKey: string = 'lang';

  constructor(private storageProvider: StorageService, private localeService: LocaleService,
              private translate: TranslateService, private seo: SeoService, private conf: ConfigService, private logService: LogService,
              private analytics: AnalyticsService) {
              }

    restoreLanguage(): string {
    const languages: IConfLocale[] = this.getSupportedLanguages();
    const cultures: string = languages.map((cur: IConfLocale) => cur.culture).toString();

    this.logService.trace('loaded default cultures from config', this.traceKey);
    this.logService.trace(cultures, this.traceKey);

    this.translate.addLangs(this.getSupportedCodes(languages));
    this.translate.setDefaultLang(this.getDefaultLocale().code);

    const langData: string = this.storageProvider.getString(this.langKey);

    if (!langData) {
      const selectedDefault: IConfLocale = this.getDefaultLanguage();

      this.translate.use(selectedDefault.code).subscribe(() => {

        this.logService.trace('set locale tags', this.traceKey);

        this.seo.setTag('og:locale', selectedDefault.culture);
        this.seo.setTag('og:locale:alternate', cultures);
      });

      this.logService.debug('use default language ' + selectedDefault.code);

      return selectedDefault.code;
    }

    const targetLanguage: IConfLocale = this.getLocaleOrDefault(langData);

    this.logService.debug('restore culture ' + targetLanguage.culture);

    this.translate.use(targetLanguage.code).subscribe(() => {

      this.logService.trace('set locale tags', this.traceKey);

      this.seo.setTag('og:locale', targetLanguage.culture);
      this.seo.setTag('og:locale:alternate', cultures);
    });

    return targetLanguage.code;
   }

   saveLanguage(lang: string): void {
    const targetLanguage: IConfLocale = this.getLocaleOrDefault(lang);

    this.translate.use(targetLanguage.code).subscribe(() => {
      this.seo.setTag('og:locale', targetLanguage.culture);
    });
    this.analytics.trackAction(
      'analytics.categories.settings.culture_change_action',
      'analytics.categories.settings.name',
      'analytics.labels.culture',
      targetLanguage.culture);

    this.logService.debug('setting language to ' + targetLanguage.culture);

    this.storageProvider.storeString(this.langKey, targetLanguage.code);
   }

   getTranslation(str: string): string {
    return this.translate.instant(str);
  }

  getTranslation$(str: string): Observable<string> {
    return this.translate.get(str);
  }

  getSupportedLanguages(): IConfLocale[] {
    return this.conf.getSettings('i18n.availableLanguages');
  }

  getSupportedCodes(languages?: IConfLocale[]): string[] {
    return languages ? languages.map((locale: IConfLocale) => locale.code) :
     this.getSupportedLanguages().map((locale: IConfLocale) => locale.code);
 }

  private getDefaultLanguage(): IConfLocale {
    const locale: string = this.localeService.getCurrentLocale();
    const targetDefault: IConfLocale = this.getLocaleOrDefault(locale);

    return targetDefault;
  }

  private getLocaleOrDefault(locale: string): IConfLocale {
    return this.getSupportedLanguages().filter((supported: IConfLocale) => supported.code === locale)[0] || this.getDefaultLocale();
  }

  private getDefaultLocale(): IConfLocale {
    return this.conf.getSettings('i18n.defaultLanguage');
  }
}
