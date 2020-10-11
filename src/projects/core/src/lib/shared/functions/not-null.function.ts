import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export function notNull<T>(): MonoTypeOperatorFunction<T> {
  return (input$: Observable<T>): Observable<T> => input$.pipe(
    filter((item: T) => {
      if (item instanceof Array) {
        return item && item.length > 0;
      }

      return !!item;
    },
    ),
  );
}
