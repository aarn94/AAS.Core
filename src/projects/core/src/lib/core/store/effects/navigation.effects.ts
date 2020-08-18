import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterNavigatedPayload, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, tap, withLatestFrom } from 'rxjs/operators';

import { IGo, INavigationProps } from '../../interfaces';
import { ANALYTICS_SELECTORS } from '../../modules/analytics/store/selectors/index';
import { NAVIGATION_ACTIONS } from '../actions';
import { RouterService } from '../../services';
import { AnalyticsService } from '../../modules/analytics/services';
import { IAppState } from '../../../state/interfaces';

@Injectable()
export class NavigationEffects {
  onGo$: Observable<IGo> = createEffect(() =>
    this.actions$.pipe(
      ofType(NAVIGATION_ACTIONS.go),
      tap((result: IGo) => {
        this.routerService.go(result);
      }),
    ), {dispatch: false},
  );

  onGoWithReplace$: Observable<IGo> = createEffect(() =>
    this.actions$.pipe(
      ofType(NAVIGATION_ACTIONS.replace),
      tap((result: IGo) => {
        this.routerService.goWithReset(result);
      }),
    ), {dispatch: false},
  );

  navigateBack$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(NAVIGATION_ACTIONS.back),
      tap(() => this.routerService.backward),
    ),
  );

  navigateForward$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(NAVIGATION_ACTIONS.forward),
      tap(() => this.routerService.forward),
    ),
  );

  routeChange$: Observable<unknown> = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      distinctUntilChanged(),
      withLatestFrom(this.store.select(ANALYTICS_SELECTORS.selectInitialized)),
      tap(([nav, initialized]: [INavigationProps<RouterNavigatedPayload>, boolean]) => {
        if (initialized) {
          this.analyticsService.pageTrack(nav.payload.event.url);
        }
      }),

    ), {dispatch: false},
  );

  constructor(
    private actions$: Actions,
    private routerService: RouterService,
    private analyticsService: AnalyticsService,
    private store: Store<IAppState>,
  ) {}
}
