import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { TranslateLoader } from '@ngx-translate/core';
import { readFileSync } from 'fs';
import { Observable, Observer } from 'rxjs';
import { Injector } from '@angular/core';
import { IAssetsSettings } from '../../../interfaces';
import { ITranslationSettings } from '../interfaces';
import { TRANSLATION_SETTINGS } from '../tokens/index';
import { ASSETS_SETTINGS } from '../../../tokens';
import { defaultServerAssetsPath, defaultTranslatePathInAssets, defaultTranslateEnabled } from '../../../../defaults.model';

class ServerTranslateLoader extends TranslateLoader {

  private assetsPath: string = defaultServerAssetsPath;
  private enabled: boolean = defaultTranslateEnabled;
  private configPathInAssets: string = defaultTranslatePathInAssets;
  private fullPath: string;

  constructor(private transfer: TransferState,
    assetsSettings: IAssetsSettings,
    translationSettings: ITranslationSettings) {
      super();

      if(assetsSettings) {
        this.assetsPath = assetsSettings.serverPath;
      }

      if(translationSettings){
        this.configPathInAssets = translationSettings.configLocationInAssets;
        this.enabled = translationSettings.enabled;
      }

      this.fullPath = `${this.assetsPath}${this.configPathInAssets}}`;
  }
  getTranslation(lang: string): Observable<unknown> {
    return new Observable((observer: Observer<unknown>) => {

      if(!this.enabled){
        observer.next({});
        observer.complete();
      } else {

        const path: string = `${this.fullPath}${lang}.json`;
        const data: string = JSON.parse(readFileSync(path, 'utf8'));
        const key: StateKey<number> = makeStateKey<number>(`transfer-translate-${lang}`);

        this.transfer.set(key, data);
        observer.next(data);
        observer.complete();
      }
    });
  }
}

export function universalTranslateLoader(transfer: TransferState, injector: Injector): TranslateLoader {

  const assetsSettings: IAssetsSettings = injector.get(ASSETS_SETTINGS);
  const translationSettings: ITranslationSettings = injector.get(TRANSLATION_SETTINGS);

  return new ServerTranslateLoader(transfer, assetsSettings, translationSettings);
}
