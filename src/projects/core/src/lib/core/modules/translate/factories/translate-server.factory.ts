import { Injector } from '@angular/core';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { TranslateLoader } from '@ngx-translate/core';
import { readFileSync } from 'fs';
import { Observable, Observer } from 'rxjs';

import { defaultServerAssetsPath, defaultTranslateEnabled, defaultTranslatePathInAssets } from '../../../../shared/constants';
import { IAssetsSettings } from '../../../interfaces';
import { ASSETS_SETTINGS } from '../../../tokens';
import { ITranslationSettings } from '../interfaces';
import { TRANSLATION_SETTINGS } from '../tokens/index';

class ServerTranslateLoader extends TranslateLoader {

  private assetsPath: string;
  private enabled: boolean;
  private configPathInAssets: string;
  private fullPath: string;

  constructor(private transfer: TransferState,
              assetsSettings: IAssetsSettings,
              translationSettings: ITranslationSettings) {
      super();

      this.assetsPath = assetsSettings?.serverPath ?? defaultServerAssetsPath ;
      this.configPathInAssets = translationSettings?.configLocationInAssets ?? defaultTranslatePathInAssets;
      this.enabled = translationSettings?.enabled ?? defaultTranslateEnabled;
      this.fullPath = `${this.assetsPath}${this.configPathInAssets}`;
  }
  getTranslation(lang: string): Observable<unknown> {
    return new Observable((observer: Observer<unknown>) => {

      if (!this.enabled) {
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

  const assetsSettings: IAssetsSettings = injector.get(ASSETS_SETTINGS, null);
  const translationSettings: ITranslationSettings = injector.get(TRANSLATION_SETTINGS, null);

  return new ServerTranslateLoader(transfer, assetsSettings, translationSettings);
}
