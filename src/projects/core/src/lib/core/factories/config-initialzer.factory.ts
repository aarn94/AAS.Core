import { Store } from '@ngrx/store';
import { ConfigService } from '@ngx-config/core';

import { IAASState } from '../../state/interfaces';
import { configLoaded } from '../store/actions';

export const configInitializerFactory = (config: ConfigService, store: Store<IAASState>) => {
  // workaround for AoT compilation
  const res = () => {
    return (config.init() as Promise<any>).finally(() => store.dispatch(configLoaded()));
  };

  return res;
};
