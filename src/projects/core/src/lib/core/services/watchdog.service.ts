import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class WatchDogService {

    constructor(@Inject(PLATFORM_ID) private platformId: string) {
    }

    run<T>(func: () => Observable<T>, whenCancel: T = null): Observable<T> {

        if (isPlatformBrowser(this.platformId)) {
            return func();
          }

        const watchdog: Observable<number> = timer(500);

        return Observable.create((subject) => {
            func().pipe(takeUntil(watchdog)).subscribe((response: T) => {
              subject.next(response);
              subject.complete();
            });
            watchdog.subscribe(() => {
              subject.next(whenCancel);
              subject.complete();
            });
          });

    }
}
