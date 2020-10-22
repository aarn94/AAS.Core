import { InjectionToken } from '@angular/core';

import { ISyncSettings } from '../../core/interfaces';

declare var window: any;

export const STATE_CB = new InjectionToken('to provide the state cb');
export const SYNC_SETTINGS = new InjectionToken<ISyncSettings>('SyncSettings');
