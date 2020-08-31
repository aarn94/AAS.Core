
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

import { appStarted } from '../../core/store/actions';
import { IAASState } from '../../state/interfaces';
import { selectInitialized } from '../store/selectors';

export function store_init(store: Store<IAASState>): () => Promise<boolean> {
  return (): Promise<boolean> => {
    store.dispatch(appStarted());

    return store.select(selectInitialized).pipe(
      filter((initialized: boolean) => initialized),
      take(1),
    ).toPromise();
  };
}
