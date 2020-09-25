import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IAASState } from '../../state/interfaces';
import { loadingFinished } from '../store/actions';

export function withLoadingFinish<T>(observ: Observable<T>, store: Store<IAASState>): Observable<T> {
  return observ.pipe(
    finalize(() => store.dispatch(loadingFinished())),
  );
}
