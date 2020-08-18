import { InjectionToken } from "@angular/core";
import { IConfigurationSettings, IAssetsSettings } from '../interfaces';

export const ASSETS_SETTINGS = new InjectionToken<IAssetsSettings>('AssetsSettings');
export const CONFIG_SETTINGS = new InjectionToken<IConfigurationSettings>('ConfigSettings');
