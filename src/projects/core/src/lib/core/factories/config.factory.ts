import { HttpClient } from '@angular/common/http';
import { forwardRef, Inject, Injector, resolveForwardRef } from '@angular/core';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { ConfigLoader } from '@ngx-config/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { defaultBrowserAssetsPath, defaultConfigEnabled, defaultConfigName, defaultConfigPathInAssets } from '../../shared/constants';
import { IAssetsSettings, IConfigurationSettings } from '../interfaces';
import { ASSETS_SETTINGS, CONFIG_SETTINGS } from '../tokens';
import { createHttpClient } from '../functions';
import { TokenInterceptor } from '../modules/auth';

export class AppConfigLoader implements ConfigLoader {

  private assetsPath: string;
  private configPathInAssets: string;
  private configFileName: string;
  private baseConfigName: string = 'config.base.json';
  private configEnabled: boolean;
  private fullPath: string;

  constructor(
    @Inject(forwardRef(() => HttpClient)) private readonly http: HttpClient,
    private transfer: TransferState,
    assetsSettings: IAssetsSettings,
    configSettings: IConfigurationSettings,
  ) {
      this.configEnabled = configSettings?.configEnabled ?? defaultConfigEnabled;
      this.configPathInAssets = configSettings?.configLocationInAssets ?? defaultConfigPathInAssets;
      this.configFileName = configSettings?.configFileName ?? defaultConfigName;
      this.assetsPath = assetsSettings?.browserPath ?? defaultBrowserAssetsPath;
      this.fullPath = `${this.assetsPath}${this.configPathInAssets}`;
  }

  loadSettings(): any {
    return new Promise((resolve: any, reject: Function) => {
      const key: StateKey<number> = makeStateKey<number>(`transfer-config`);
      const data: unknown = this.transfer.get(key, null);

      if (data) {
        this.transfer.remove(key);
        resolve(data);
      } else {

        if (!this.configEnabled) {
          resolve({});
        } else {
          const http: HttpClient = resolveForwardRef(this.http);

          const baseConfigPath: string = `${this.fullPath}${this.baseConfigName}`;
          const extendedConfigPath: string = `${this.fullPath}${this.configFileName}`;

          forkJoin([
          http.get(baseConfigPath),
          http.get(extendedConfigPath)]).pipe(
            map(([dataBaseResult, dataResult]: [any, any]) => {
              return {...dataBaseResult, ...dataResult};
            })).subscribe(resolve, (any) => reject(any));
        }
      }
   });
  }
}

export const configFactory: (transfer: TransferState, injector: Injector) => ConfigLoader =
(transfer: TransferState, injector: Injector) => {

  const assetsSettings: IAssetsSettings = injector.get(ASSETS_SETTINGS, null);
  const configSettings: IConfigurationSettings = injector.get(CONFIG_SETTINGS, null);
  const http: HttpClient = createHttpClient(injector, [TokenInterceptor]);

  return new AppConfigLoader(http, transfer, assetsSettings, configSettings);
};
