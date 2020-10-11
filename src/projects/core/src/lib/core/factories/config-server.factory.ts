import { Injector } from '@angular/core';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { ConfigLoader } from '@ngx-config/core';
import { readFileSync } from 'fs';
import { join } from 'path';

import { defaultBaseConfigName, defaultConfigEnabled, defaultConfigName, defaultConfigPathInAssets, defaultServerAssetsPath } from '../../shared/constants';
import { IAssetsSettings, IConfigurationSettings } from '../interfaces';
import { ASSETS_SETTINGS, CONFIG_SETTINGS } from '../tokens';

export class SsrAppConfigLoader implements ConfigLoader {

  private assetsPath: string;
  private configPathInAssets: string;
  private configFileName: string;
  private baseConfigName: string;
  private configEnabled: boolean;
  private fullPath: string;

  constructor(private transfer: TransferState,
              assetsSettings: IAssetsSettings,
              configSettings: IConfigurationSettings) {
      this.configEnabled = configSettings?.configEnabled ?? defaultConfigEnabled;
      this.configPathInAssets = configSettings?.configLocationInAssets ?? defaultConfigPathInAssets;
      this.configFileName = configSettings?.configFileName ?? defaultConfigName;
      this.assetsPath = assetsSettings?.serverPath ?? defaultServerAssetsPath;
      this.fullPath = `${this.assetsPath}${this.configPathInAssets}`;
      this.baseConfigName = configSettings?.configBaseFileName ?? defaultBaseConfigName;
    }

  loadSettings(): any {
    return new Promise((resolve: any, reject: Function) => {

      if (!this.configEnabled) {
        resolve({});
      } else {
        const dataBase: any = JSON.parse(readFileSync(join(this.fullPath, this.baseConfigName), 'utf8') ?? '{}');
        const data: any = JSON.parse(readFileSync(join(this.fullPath, this.configFileName), 'utf8') ?? '{}');
        const merged: string = {...dataBase, ...data};

        const key: StateKey<number> = makeStateKey<number>(`transfer-config`);

        this.transfer.set(key, merged);

        resolve(merged);
      }
    });
  }
}

export function universalConfigLoader(transfer: TransferState, injector: Injector): ConfigLoader {
  const assetsSettings: IAssetsSettings = injector.get(ASSETS_SETTINGS, null);
  const configSettings: IConfigurationSettings = injector.get(CONFIG_SETTINGS, null);

  return new SsrAppConfigLoader(transfer, assetsSettings, configSettings);
}
