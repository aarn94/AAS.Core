import { HttpClient } from '@angular/common/http';
import { forwardRef, Inject, resolveForwardRef, Injector } from '@angular/core';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { ConfigLoader } from '@ngx-config/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  defaultBrowserAssetsPath,
  defaultConfigPathInAssets,
  defaultConfigName,
  defaultBaseConfigName,
  defaultConfigEnabled
} from '../../defaults.model';
import { IAssetsSettings, IConfigurationSettings } from '../interfaces';
import { ASSETS_SETTINGS, CONFIG_SETTINGS } from '../tokens';


export class AppConfigLoader implements ConfigLoader {

  private assetsPath: string = defaultBrowserAssetsPath;
  private configPathInAssets: string = defaultConfigPathInAssets;
  private configFileName: string  = defaultConfigName;
  private baseConfigName: string = defaultBaseConfigName;
  private configEnabled: boolean = defaultConfigEnabled;
  private fullPath: string;

  constructor(
    @Inject(forwardRef(() => HttpClient)) private readonly http: HttpClient,
    private transfer: TransferState,
    assetsSettings: IAssetsSettings,
    configSettings: IConfigurationSettings
  ) {
    if(configSettings){
      this.configEnabled = configSettings.configEnabled;
      this.configPathInAssets = configSettings.configLocationInAssets;
      this.configFileName = configSettings.configFileName;
    }

    if(assetsSettings) {
      this.assetsPath = assetsSettings.browserPath;
    }

    this.fullPath = `${this.assetsPath}${this.configPathInAssets}}`
  }

  loadSettings(): any {
    return new Promise((resolve: any, reject: Function) => {
      const key: StateKey<number> = makeStateKey<number>(`transfer-config`);
      const data: unknown = this.transfer.get(key, null);

      if (data) {
        this.transfer.remove(key);
        resolve(data);
      } else {

        if(!this.configEnabled) {
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

export const configFactory: (http: HttpClient, transfer: TransferState, injector: Injector) => ConfigLoader =
(http: HttpClient, transfer: TransferState, injector: Injector) => {

    const assetsSettings: IAssetsSettings = injector.get(ASSETS_SETTINGS);
    const configSettings: IConfigurationSettings = injector.get(CONFIG_SETTINGS);

    return new AppConfigLoader(http, transfer, assetsSettings, configSettings );
};
