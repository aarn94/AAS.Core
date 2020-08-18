import { Injectable, Optional, Inject } from '@angular/core';
import { COMMON_ACTIONS } from '../../../../store/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, take } from 'rxjs/operators';

import { GoogleAnalyticsInitService } from '../../services';
import { AnalyticsService } from '../../services/analytics.service';
import { ANALYTICS_ACTIONS } from '../actions';
import { ANALYTICS_SETTINGS } from '../../tokens';
import { IAnalyticsSettings } from '../../interfaces/analytics-settings.interface';
import { defaultAnalyticsEnabled, defaultAnalyticsWebTracker } from '../../../../../defaults.model';

@Injectable()
export class AnalyticsEffects {
    initAnalytics$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ANALYTICS_ACTIONS.initAnalytics),
      exhaustMap(() => this.googleAnalyticsInit.loadScript(this.settings?.enabled ?? defaultAnalyticsEnabled, this.settings?.analyticsWebTrackerId ?? defaultAnalyticsWebTracker ).pipe(
        take(1),
        map(() => {
          return ANALYTICS_ACTIONS.analyticsLoaded();
        }),
        catchError((error: Error) => {
          return of(COMMON_ACTIONS.handleCriticalException({data: error.message}));
        }),
      ),
    ),

  ));

  constructor(private actions$: Actions, private googleAnalyticsInit: GoogleAnalyticsInitService, private analytics: AnalyticsService, @Optional() @Inject(ANALYTICS_SETTINGS) private settings: IAnalyticsSettings) {

}
}
