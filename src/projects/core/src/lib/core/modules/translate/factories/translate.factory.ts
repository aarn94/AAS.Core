import { HttpClient } from '@angular/common/http';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
import { Injector } from '@angular/core';
import { defaultBrowserAssetsPath, defaultTranslateEnabled, defaultTranslatePathInAssets } from 'projects/core/src/lib/defaults.model';
import { ITranslationSettings } from '../interfaces';
import { ASSETS_SETTINGS } from '../../../tokens';
import { TRANSLATION_SETTINGS } from '../tokens';
import { IAssetsSettings } from '../../../interfaces';

class BrowserTranslateLoader extends TranslateLoader {

  private assetsPath: string = defaultBrowserAssetsPath;
  private enabled: boolean = defaultTranslateEnabled;
  private configPathInAssets: string = defaultTranslatePathInAssets;
  private fullPath: string;


  constructor(private http: HttpClient, private transfer: TransferState,
    assetsSettings: IAssetsSettings,
    translationSettings: ITranslationSettings) {
    super();


    if(assetsSettings) {
      this.assetsPath = assetsSettings.browserPath;
    }

    if(translationSettings){
      this.configPathInAssets = translationSettings.configLocationInAssets;
      this.enabled = translationSettings.enabled;
    }

    this.fullPath = `${this.assetsPath}${this.configPathInAssets}}`;

  }
  getTranslation(lang: string): Observable<unknown> {
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

// AOT compilation support
export function httpTranslateLoader(http: HttpClient, transfer: TransferState, injector: Injector): TranslateLoader {
  const assetsSettings: IAssetsSettings = injector.get(ASSETS_SETTINGS);
  const translationSettings: ITranslationSettings = injector.get(TRANSLATION_SETTINGS);

  return new BrowserTranslateLoader(http, transfer, assetsSettings, translationSettings);

}
