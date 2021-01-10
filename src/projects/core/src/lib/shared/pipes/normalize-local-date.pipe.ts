import moment from 'moment';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function isUtcDate(value: unknown): boolean {
  if (typeof value === 'object') {
    return false;
  }

  if (!isNaN(+value)) {
    return false;
  }

  return moment(value, true).isValid();
}

export function normalizeToLocalDate<T>(format: string = 'YYYY-MM-DD HH:mm:ss'): MonoTypeOperatorFunction<T[]> {
  return (input$: Observable<T[]>): Observable<T[]> =>
    input$.pipe(
      map((data: T[]) => {
        return data.map((element: T) => {
          const result: T = {...element};

          for (const [key, value] of Object.entries(element)) {
            if (isUtcDate(value)) {
              result[key] = moment(value, true).local().format(format);
            }
          }

          return result;
        });
      }));
}

export function normalizeValue(value: string, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  if (isUtcDate(value)) {
    return moment(value, true).local().format(format);
  }

  return value;
}
