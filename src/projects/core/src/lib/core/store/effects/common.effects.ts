import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { exhaustMap, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';

import { COMMON_ACTIONS } from '../actions';
import { isAppError, IAppError, INotification } from '../../../shared/interfaces';
import { IProps} from '../../../state/interfaces';
import { InternalizationService } from '../../modules/translate/services';
import { NotificationService, ThemeService, LoaderService } from '../../services/index';

@Injectable()
export class CommonEffects {

  onAppStarted$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(COMMON_ACTIONS.appStarted),
      take(1),
      exhaustMap(() =>
      [
        COMMON_ACTIONS.appStartedSuccess(),
      ],
    )));

    loadingStarted$: Observable<unknown> = createEffect(() =>
    this.actions$.pipe(
      ofType(COMMON_ACTIONS.loadingStarted),
      tap(() => this.loadingService.show()),
    ), { dispatch: false },
    );

    loadingFinished$: Observable < unknown > = createEffect(() =>
    this.actions$.pipe(
      ofType(COMMON_ACTIONS.loadingFinished),
      tap(() => this.loadingService.stop()),
    ), { dispatch: false },
  );

  handleException$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(COMMON_ACTIONS.handleException),
      withLatestFrom(this.internalizationService.getTranslation('SHARED.TEXTS.COMMUNICATION_PROBLEM')),
      exhaustMap(([result, error]: [IProps<HttpErrorResponse>, string]) => {
        if (isAppError(result.data.error)) {
          return of(COMMON_ACTIONS.handleAppException({data: result.data.error}));
        } else {
          return of(COMMON_ACTIONS.handleCriticalException({data: error}));
        }
      }),
    ),
  );

  handleAppException$: Observable<IProps<IAppError>> = createEffect(() =>
    this.actions$.pipe(
      ofType(COMMON_ACTIONS.handleAppException),
      tap((error: IProps<IAppError>) => this.notificationService.showError(error.data.reason)),
    ), { dispatch: false },
  );

  handleCriticalException$: Observable<IProps<string>> = createEffect(() =>
    this.actions$.pipe(
      ofType(COMMON_ACTIONS.handleCriticalException),
      tap((error: IProps<string>) => this.notificationService.showError(error.data)),
    ), { dispatch: false },
  );

  notificationSent$: Observable<IProps<INotification>> = createEffect(() =>
    this.actions$.pipe(
      ofType(COMMON_ACTIONS.notificationSent),
      tap((notification: IProps<INotification>) =>
      this.notificationService.showInfo(notification.data.message, notification.data.title)),
    ), { dispatch: false },
  );

  loadTheme$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(COMMON_ACTIONS.modeLoad),
      switchMap(() => {
       const theme: boolean = this.themeService.restoreTheme();

       return of(COMMON_ACTIONS.modeLoadSuccess({data: theme}));
      }),
    ),
  );

  themeModified$: Observable<IProps<boolean>> = createEffect(() =>
    this.actions$.pipe(
      ofType(COMMON_ACTIONS.modeModified),
      tap((lang: IProps<boolean>) =>
      this.themeService.saveTheme(lang.data)),
    ), { dispatch: false },
  );

constructor(private actions$: Actions, private notificationService: NotificationService, private themeService: ThemeService,
            private loadingService: LoaderService, private internalizationService: InternalizationService) {  }
}
