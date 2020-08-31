
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { LocalizeParser, LocalizeRouterSettings } from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';
import { readFileSync } from 'fs';

import { defaultBrowserAssetsPath, defaultTranslateRouterConfigName, defaultTranslateRouterConfigPathInAssets, defaultTranslateRouterEnabled } from '../../../../shared/constants';
import { IAssetsSettings } from '../../../interfaces';
import { ASSETS_SETTINGS } from '../../../tokens';
import { ITranslationSettings } from '../interfaces';
import { TRANSLATION_SETTINGS } from '../tokens';

export class LocalizeConfigLoader extends LocalizeParser {

  private baseConfigName: string;
  private assetsPath: string;
  private configPathInAssets: string;
  private enabled: boolean;
  private fullPath: string;

  constructor(translate: TranslateService, location: Location,
              settings: LocalizeRouterSettings, private transfer: TransferState,
              assetsSettings: IAssetsSettings, translationSettings: ITranslationSettings, private http: HttpClient) {
      super(translate, location, settings);

      this.enabled = translationSettings?.routerEnabled ?? defaultTranslateRouterEnabled;
      this.assetsPath = assetsSettings?.browserPath ?? defaultBrowserAssetsPath;
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
        const key: StateKey<number> = makeStateKey<number>(`router-locale-config`);
        const dataBase: any = this.transfer.get(key, null);

        if (dataBase) {
          this.transfer.remove(key);

          this.locales = dataBase.i18n.locales;
          this.prefix = dataBase.i18n.prefix;

          this.init(routes).then(resolve);
        } else {
          const baseConfigPath: string = `${this.fullPath}${this.baseConfigName}`;

          this.http.get(baseConfigPath).subscribe((file: any) => {

            this.locales = file.i18n.locales;
            this.prefix = file.i18n.prefix;

            this.init(routes).then(resolve);
          });
        }
      }
    });
  }
}

export function localizeConfigFactory(translate: TranslateService, location: Location,
                                      settings: LocalizeRouterSettings, transfer: TransferState, injector: Injector, http: HttpClient)
                                      : LocalizeConfigLoader {

  const assetsSettings: IAssetsSettings = injector.get(ASSETS_SETTINGS, null);
  const translationSettings: ITranslationSettings = injector.get(TRANSLATION_SETTINGS, null);

  return new LocalizeConfigLoader(translate, location, settings, transfer, assetsSettings, translationSettings, http);
}
