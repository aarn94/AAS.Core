
import { COMMON_ACTIONS } from '../../core/store/actions';
import { COMMON_SELECTORS } from '../../core/store/selectors';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { IAppState } from '../../state/interfaces';

export function store_init(store: Store<IAppState>): () => Promise<boolean> {
  return (): Promise<boolean> => {
    store.dispatch(COMMON_ACTIONS.appStarted());

    return store.select(COMMON_SELECTORS.selectInitialized).pipe(
      filter((initialized: boolean) => initialized),
      take(1),
    ).toPromise();
  };
}
