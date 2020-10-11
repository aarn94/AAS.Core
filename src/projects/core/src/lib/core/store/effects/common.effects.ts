import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { exhaustMap, skipWhile, switchMap, take, tap } from 'rxjs/operators';

import { IAppError, INotification, isAppError } from '../../../shared/interfaces';
import { IAASState, IProps } from '../../../state/interfaces';
import { restoreLogin } from '../../modules/auth/store/actions';
import { InternalizationService } from '../../modules/translate/services';
import { languageload, languageloadSuccess } from '../../modules/translate/store/actions';
import { LoaderService, NotificationService, ThemeService } from '../../services';
import {
  appStarted,
  appStartedSuccess,
  handleAppException,
  handleCriticalException,
  handleException,
  loadingFinished,
  loadingStarted,
  modeLoad,
  modeLoadSuccess,
  modeModified,
  notificationSent,
  setInitialPath,
} from '../actions';
import { selectConfigLoaded } from '../selectors';

@Injectable()
export class CommonEffects {

  onAppStarted$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(appStarted),
    switchMap(() => this.store.select(selectConfigLoaded).pipe(skipWhile((initialized: boolean) => !initialized))),
    take(1),
    exhaustMap(() =>
    [
      languageload(),
    ],
  )));

  onAppStarted2$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(languageloadSuccess),
      take(1),
      exhaustMap(() =>
      [
        restoreLogin(),
        appStartedSuccess(),
        setInitialPath({data: document.location.pathname.split('/')}),
      ],
    )));

    loadingStarted$: Observable<unknown> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadingStarted),
      tap(() => this.loadingService.show()),
    ), { dispatch: false },
    );

    loadingFinished$: Observable < unknown > = createEffect(() =>
    this.actions$.pipe(
      ofType(loadingFinished),
      tap(() => this.loadingService.stop()),
    ), { dispatch: false },
  );

  handleException$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(handleException),
      exhaustMap((result: IProps<HttpErrorResponse>) => {
        if (isAppError(result?.data?.error)) {
          return of(handleAppException({data: result.data.error}));
        } else {
          const error: string = this.internalizationService.getTranslation('SHARED.TEXTS.COMMUNICATION_PROBLEM');

          return of(handleCriticalException({data: error}));
        }
      }),
    ),
  );

  handleAppException$: Observable<IProps<IAppError>> = createEffect(() =>
    this.actions$.pipe(
      ofType(handleAppException),
      tap((error: IProps<IAppError>) => {
        return this.notificationService.showError(error.data.reason, this.internalizationService.getTranslation('SHARED.TEXTS.ERROR'));
      }),
    ), { dispatch: false },
  );

  handleCriticalException$: Observable<IProps<string>> = createEffect(() =>
    this.actions$.pipe(
      ofType(handleCriticalException),
      tap((error: IProps<string>) => this.notificationService.showError(error.data, this.internalizationService.getTranslation('SHARED.TEXTS.ERROR'))),
    ), { dispatch: false },
  );

  notificationSent$: Observable<IProps<INotification>> = createEffect(() =>
    this.actions$.pipe(
      ofType(notificationSent),
      tap((notification: IProps<INotification>) =>
      this.notificationService.showInfo(notification.data.message, notification.data.title)),
    ), { dispatch: false },
  );

  loadTheme$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(modeLoad),
      switchMap(() => {
       const theme: boolean = this.themeService.restoreTheme();

       return of(modeLoadSuccess({data: theme}));
      }),
    ),
  );

  themeModified$: Observable<IProps<boolean>> = createEffect(() =>
    this.actions$.pipe(
      ofType(modeModified),
      tap((lang: IProps<boolean>) =>
      this.themeService.saveTheme(lang.data)),
    ), { dispatch: false },
  );

constructor(private actions$: Actions, private notificationService: NotificationService, private themeService: ThemeService,
            private loadingService: LoaderService, private internalizationService: InternalizationService,
            private store: Store<IAASState>) {  }
}
