
import { Injectable } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { TranslateService } from '@ngx-translate/core';

import { LogService, StorageService } from '../../../services';
import { AnalyticsService } from '../../analytics/services';
import { SeoService } from '../../seo/services';
import { IConfLocale } from '../interfaces';

import { LocaleService } from './locale.service';
import { Observable } from 'rxjs';

@Injectable()
export class InternalizationService {

  private langKey: string = 'currentLanguage';

  constructor(private storageProvider: StorageService, private localeService: LocaleService,
              private translate: TranslateService, private seo: SeoService, private conf: ConfigService, private logService: LogService,
              private analytics: AnalyticsService) {
              }

    restoreLanguage(): string {
    const languages: IConfLocale[] = this.getSupportedLanguages();
    const cultures: string = languages.map((cur: IConfLocale) => cur.culture).toString();

    this.translate.addLangs(this.getSupportedCodes(languages));
    this.translate.setDefaultLang(this.getDefaultLocale().code);

    this.logService.debug('loaded default cultures from config ' + cultures);

    const langData: string = this.storageProvider.getString(this.langKey);

    if (!langData) {
      const selectedDefault: string = this.getDefaultLanguage();

      this.translate.use(selectedDefault);

      this.logService.debug('use default language ' + selectedDefault);

      return selectedDefault;
    }

    const targetLanguage: IConfLocale = this.getLocaleOrDefault(langData);

    this.logService.debug('setting restore culture ' + targetLanguage.culture);

    this.translate.use(targetLanguage.code).subscribe(() => {
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

  private getDefaultLanguage(): string {
    const locale: string = this.localeService.getCurrentLocale();
    const targetDefault: IConfLocale = this.getLocaleOrDefault(locale);

    return targetDefault.code;
  }

  private getLocaleOrDefault(locale: string): IConfLocale {
    return this.getSupportedLanguages().filter((supported: IConfLocale) => supported.code === locale)[0] || this.getDefaultLocale();
  }

  private getDefaultLocale(): IConfLocale {
    return this.conf.getSettings('i18n.defaultLanguage');
  }
}
