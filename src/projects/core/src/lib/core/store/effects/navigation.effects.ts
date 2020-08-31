import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterNavigatedPayload, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { IAASState } from '../../../state/interfaces';
import { IGo, INavigationProps } from '../../interfaces';
import { AnalyticsService } from '../../modules/analytics/services';
import { initializedAnalytics } from '../../modules/analytics/store/selectors';
import { RouterService } from '../../services';
import { back, forward, go, replace } from '../actions';
import { selectPreviousPath } from '../selectors';

@Injectable()
export class NavigationEffects {
  onGo$: Observable<IGo> = createEffect(() =>
    this.actions$.pipe(
      ofType(go),
      tap((result: IGo) => {
        this.routerService.go(result);
      }),
    ), {dispatch: false},
  );

  onGoWithReplace$: Observable<IGo> = createEffect(() =>
    this.actions$.pipe(
      ofType(replace),
      tap((result: IGo) => {
        this.routerService.goWithReset(result);
      }),
    ), {dispatch: false},
  );

  navigateBack$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(back),
      withLatestFrom(this.store.select(selectPreviousPath)),
      switchMap(([_action, previousPath]: [Action, string[]]) => of(go({data: previousPath}))),
    ),
  );

  navigateForward$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(forward),
      withLatestFrom(this.store.select(selectPreviousPath)),
      switchMap(([_action, previousPath]: [Action, string[]]) => of(go({data: previousPath}))),
    ),
  );

  routeChange$: Observable<unknown> = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      distinctUntilChanged(),
      withLatestFrom(this.store.select(initializedAnalytics)),
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
    private store: Store<IAASState>,
  ) {}
}
