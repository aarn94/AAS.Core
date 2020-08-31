import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';

import { defaultBrowserAssetsPath, defaultTranslateEnabled, defaultTranslatePathInAssets } from '../../../../shared/constants';
import { IAssetsSettings } from '../../../interfaces';
import { ASSETS_SETTINGS } from '../../../tokens';
import { ITranslationSettings } from '../interfaces';
import { TRANSLATION_SETTINGS } from '../tokens';

class BrowserTranslateLoader extends TranslateLoader {

  private assetsPath: string;
  private enabled: boolean;
  private configPathInAssets: string;
  private fullPath: string;

  constructor(private http: HttpClient, private transfer: TransferState,
              assetsSettings: IAssetsSettings,
              translationSettings: ITranslationSettings) {
     super();

     this.assetsPath = assetsSettings?.browserPath ?? defaultBrowserAssetsPath ;
     this.configPathInAssets = translationSettings?.configLocationInAssets ?? defaultTranslatePathInAssets;
     this.enabled = translationSettings?.enabled ?? defaultTranslateEnabled;
     this.fullPath = `${this.assetsPath}${this.configPathInAssets}`;

  }
  getTranslation(lang: string): Observable<unknown> {

    if (!this.enabled) {
        return new Observable((observer: Observer<unknown>) => {
          observer.next({});
          observer.complete();
      });
    } else {

      const key: StateKey<number> = makeStateKey<number>(`transfer-translate-${lang}`);
      const data: unknown = this.transfer.get(key, null);

      if (data) {
        this.transfer.remove(key);

        return new Observable((observer: Observer<unknown>) => {
            observer.next(data);
            observer.complete();
          });
        } else {
          return this.http.get(`${this.fullPath}${lang}.json`);
        }
    }

  }
}

// AOT compilation support
export function httpTranslateLoader(http: HttpClient, transfer: TransferState, injector: Injector): TranslateLoader {
  const assetsSettings: IAssetsSettings = injector.get(ASSETS_SETTINGS, null);
  const translationSettings: ITranslationSettings = injector.get(TRANSLATION_SETTINGS, null);

  return new BrowserTranslateLoader(http, transfer, assetsSettings, translationSettings);

}
