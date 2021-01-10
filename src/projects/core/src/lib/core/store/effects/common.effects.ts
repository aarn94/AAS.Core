import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { exhaustMap, skipWhile, switchMap, take, tap } from 'rxjs/operators';

import { MessageLevel } from '../../../shared';
import { IAppError, INotification, isAppError } from '../../../shared/interfaces';
import { IAASState, IProps } from '../../../state/interfaces';
import { stringifyError } from '../../functions';
import { logout, restoreLogin } from '../../modules/auth/store/actions';
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
  modeModified, noAction,
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
          restoreLogin(),
          languageload(),
        ],
      )));

  onAppStarted2$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(languageloadSuccess),
      take(1),
      exhaustMap(() =>
        [
          appStartedSuccess(),
          setInitialPath({ data: document.location.pathname.split('/') }),
        ],
      )));

  loadingStarted$: Observable<unknown> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadingStarted),
      tap(() => this.loadingService.show()),
    ), { dispatch: false },
  );

  loadingFinished$: Observable<unknown> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadingFinished),
      tap(() => this.loadingService.stop()),
    ), { dispatch: false },
  );

  handleException$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(handleException),
      exhaustMap((result: { data: Error, text?: string }) => {
        const error: string = this.internalizationService.getTranslation('SHARED.TEXTS.COMMUNICATION_PROBLEM');

        if (result.data instanceof HttpErrorResponse) {
          if (isAppError(result?.data?.error)) {
            return of(handleAppException({ data: result.data.error }));
          } else {
            return of(handleCriticalException({ data: error, details: result.data }));
          }
        } else {
          return of(handleCriticalException({ data: error, details: stringifyError(result.data)}));
        }
      }),
    ),
  );

  handleAppException$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(handleAppException),
      switchMap((error: IProps<IAppError>) => {
        if (error.data.code === 'token_max_limit_exceeded') {
          logout({callbackUrl: null});
        }

        this.notificationService.showError(error.data.reason, this.internalizationService.getTranslation('SHARED.TEXTS.ERROR'));

        return [
          noAction(),
        ];
      }),
    ),
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
      tap((notification: IProps<INotification>) => {
        const type: MessageLevel = notification.data.type ?? MessageLevel.Info;

        switch (type) {
          case MessageLevel.Error:
            this.notificationService.showError(notification.data.message, notification.data.title);
            break;
          case MessageLevel.Warn:
            this.notificationService.showWarning(notification.data.message, notification.data.title);
            break;
          case MessageLevel.Success:
            this.notificationService.showSuccess(notification.data.message, notification.data.title);
            break;
          case MessageLevel.Info:
            this.notificationService.showInfo(notification.data.message, notification.data.title);
            break;
        }

      }),
    ), { dispatch: false },
  );

  loadTheme$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(modeLoad),
      switchMap(() => {
        const theme: boolean = this.themeService.restoreTheme();

        return of(modeLoadSuccess({ data: theme }));
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
              private store: Store<IAASState>) { }
}
