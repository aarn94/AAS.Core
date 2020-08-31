import { Inject, Injectable, Optional } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, take } from 'rxjs/operators';

import { defaultAnalyticsEnabled, defaultAnalyticsWebTracker } from '../../../../../shared/constants';
import { handleCriticalException } from '../../../../store/actions';
import { IAnalyticsSettings } from '../../interfaces/analytics-settings.interface';
import { GoogleAnalyticsInitService } from '../../services';
import { AnalyticsService } from '../../services/analytics.service';
import { ANALYTICS_SETTINGS } from '../../tokens';
import { analyticsLoaded, initAnalytics } from '../actions';

@Injectable()
export class AnalyticsEffects {
    initAnalytics$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(initAnalytics),
      exhaustMap(() => this.googleAnalyticsInit.loadScript(this.settings?.enabled ?? defaultAnalyticsEnabled, this.settings?.analyticsWebTrackerId ?? defaultAnalyticsWebTracker).pipe(
        take(1),
        map(() => {
          return analyticsLoaded();
        }),
        catchError((error: Error) => {
          return of(handleCriticalException({data: error.message}));
        }),
      ),
    ),

  ));

  constructor(private actions$: Actions, private googleAnalyticsInit: GoogleAnalyticsInitService, private analytics: AnalyticsService, @Optional() @Inject(ANALYTICS_SETTINGS) private settings: IAnalyticsSettings) {

}
}
