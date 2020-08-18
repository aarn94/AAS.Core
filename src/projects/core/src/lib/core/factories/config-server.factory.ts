import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { ConfigLoader } from '@ngx-config/core';
import { readFileSync } from 'fs';
import { CONFIG_SETTINGS, ASSETS_SETTINGS } from '../tokens';
import { IConfigurationSettings, IAssetsSettings } from '../interfaces';
import { Injector } from '@angular/core';
import {
  defaultServerAssetsPath,
  defaultConfigPathInAssets,
  defaultBaseConfigName,
  defaultConfigEnabled,
  defaultConfigName
} from '../../defaults.model';

export class SsrAppConfigLoader implements ConfigLoader {

  private assetsPath: string = defaultServerAssetsPath;
  private configPathInAssets: string = defaultConfigPathInAssets;
  private configFileName: string  = defaultConfigName;
  private baseConfigName: string = defaultBaseConfigName;
  private configEnabled: boolean = defaultConfigEnabled;
  private fullPath: string;

  constructor(private envFileName: string, private transfer: TransferState,
    assetsSettings: IAssetsSettings,
    configSettings: IConfigurationSettings) {
      if(configSettings){
        this.configEnabled = configSettings.configEnabled;
        this.configPathInAssets = configSettings.configLocationInAssets;
        this.configFileName = configSettings.configFileName;
      }

      if(assetsSettings) {
        this.assetsPath = assetsSettings.serverPath;
      }

      this.fullPath = `${this.assetsPath}${this.configPathInAssets}}`
    }

  loadSettings(): any {
    return new Promise((resolve: any, reject: Function) => {

      if (!this.configEnabled){
        resolve({});
      } else {
        const dataBase: any = JSON.parse(readFileSync(this.fullPath + this.baseConfigName, 'utf8'));
        const data: any = JSON.parse(readFileSync(this.fullPath + this.envFileName, 'utf8'));

        const merged: string = {...dataBase, ...data};

        const key: StateKey<number> = makeStateKey<number>(`transfer-config`);

        this.transfer.set(key, merged);

        resolve(merged);
      }
    });
  }
}

export function universalConfigLoader(transfer: TransferState, injector: Injector): ConfigLoader {
  const assetsSettings: IAssetsSettings = injector.get(ASSETS_SETTINGS);
  const configSettings: IConfigurationSettings = injector.get(CONFIG_SETTINGS);

  return new SsrAppConfigLoader(this.configFileName,transfer, assetsSettings, configSettings);
}
