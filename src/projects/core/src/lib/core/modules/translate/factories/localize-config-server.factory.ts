
import { Location } from '@angular/common';
import { Injector } from '@angular/core';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { LocalizeParser, LocalizeRouterSettings } from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';
import { readFileSync } from 'fs';

import { defaultServerAssetsPath, defaultTranslateRouterConfigName, defaultTranslateRouterConfigPathInAssets, defaultTranslateRouterEnabled } from '../../../../shared/constants';
import { IAssetsSettings } from '../../../interfaces';
import { ASSETS_SETTINGS } from '../../../tokens';
import { ITranslationSettings } from '../interfaces';
import { TRANSLATION_SETTINGS } from '../tokens';

export class LocalizeConfigServerLoader extends LocalizeParser {

  private baseConfigName: string;
  private assetsPath: string;
  private configPathInAssets: string;
  private enabled: boolean;
  private fullPath: string;

  constructor(translate: TranslateService, location: Location,
              settings: LocalizeRouterSettings, private transfer: TransferState,
              assetsSettings: IAssetsSettings, translationSettings: ITranslationSettings) {
      super(translate, location, settings);

      this.enabled = translationSettings?.routerEnabled ?? defaultTranslateRouterEnabled;
      this.assetsPath = assetsSettings?.serverPath ?? defaultServerAssetsPath;
      this.configPathInAssets = translationSettings?.configLocationInAssets ?? defaultTranslateRouterConfigPathInAssets;
      this.baseConfigName = translationSettings?.routerLocaleFileName  ?? defaultTranslateRouterConfigName;
      this.fullPath = `${this.assetsPath}${this.configPathInAssets}`;
    }

  load(routes: Routes): Promise<any> {

    return new Promise((resolve: any) => {
      if (!this.enabled) {
        this.locales = ['pl'];
        this.prefix = null;

        this.init(routes).then(resolve);
      } else {
        const dataBase: any = JSON.parse(readFileSync(this.fullPath + this.baseConfigName, 'utf8'));
        const key: StateKey<number> = makeStateKey<number>(`router-locale-config`);

        this.transfer.set(key, dataBase);

        this.locales = dataBase.i18n.locales;
        this.prefix = dataBase.i18n.prefix;
        this.init(routes).then(resolve);
      }
    });
  }
}

export function localizeConfigServerFactory(translate: TranslateService, location: Location,
                                            settings: LocalizeRouterSettings, transfer: TransferState, injector: Injector):
                                            LocalizeConfigServerLoader {

  const assetsSettings: IAssetsSettings = injector.get(ASSETS_SETTINGS, null);
  const translationSettings: ITranslationSettings = injector.get(TRANSLATION_SETTINGS, null);

  return new LocalizeConfigServerLoader(translate, location, settings, transfer, assetsSettings, translationSettings);
}
