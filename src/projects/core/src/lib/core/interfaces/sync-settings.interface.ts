import { LocalStorageConfig } from 'ngrx-store-localstorage';

export interface ISyncSettings extends LocalStorageConfig {
  serverSync: boolean;
}
