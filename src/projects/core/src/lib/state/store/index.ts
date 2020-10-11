import { Injectable } from '@angular/core';
import { DataServiceError, EntityOp, ofEntityOp } from '@ngrx/data';
import { Actions, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { handleAppException, handleCriticalException, handleException, loadingFinished, loadingStarted } from '../../core/store/actions';
import { isAppError } from '../../shared/interfaces';

@Injectable()
export class DataStoreEffects {

  onStarted$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofEntityOp(
      EntityOp.QUERY_ALL,
      EntityOp.SAVE_ADD_ONE,
      EntityOp.SAVE_UPSERT_ONE,
      EntityOp.SAVE_DELETE_ONE,
      EntityOp.QUERY_LOAD,
      EntityOp.QUERY_BY_KEY,
      EntityOp.QUERY_MANY,
      EntityOp.SAVE_ADD_MANY,
      EntityOp.SAVE_UPSERT_MANY,
      EntityOp.SAVE_DELETE_MANY,
      EntityOp.SAVE_UPDATE_ONE,
      EntityOp.SAVE_UPDATE_MANY,
    ),
    switchMap((error: any) => [
      loadingStarted(),
    ]),
  ));

  onError$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofEntityOp(
      EntityOp.QUERY_ALL_ERROR,
      EntityOp.SAVE_ADD_ONE_ERROR,
      EntityOp.SAVE_UPSERT_ONE_ERROR,
      EntityOp.SAVE_DELETE_ONE_ERROR,
      EntityOp.QUERY_LOAD_ERROR,
      EntityOp.QUERY_BY_KEY_ERROR,
      EntityOp.QUERY_MANY_ERROR,
      EntityOp.SAVE_ADD_MANY_ERROR,
      EntityOp.SAVE_UPSERT_MANY_ERROR,
      EntityOp.SAVE_DELETE_MANY_ERROR,
      EntityOp.SAVE_UPDATE_ONE_ERROR,
      EntityOp.SAVE_UPDATE_MANY_ERROR,
    ),
    switchMap((error: any) => {
      if (error?.payload?.data?.error) {
        const dataServiceError: DataServiceError = error?.payload?.data?.error;

        if (isAppError(dataServiceError.error?.error)) {
          return [
            loadingFinished(),
            handleAppException({data: dataServiceError.error?.error}),
          ];
        }
        return [
          loadingFinished(),
          handleException({data: null}),
        ];
      }})));

  onSuccess$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofEntityOp(
      EntityOp.QUERY_ALL_SUCCESS,
      EntityOp.SAVE_ADD_ONE_SUCCESS,
      EntityOp.SAVE_UPSERT_ONE_SUCCESS,
      EntityOp.SAVE_DELETE_ONE_SUCCESS,
      EntityOp.QUERY_LOAD_SUCCESS,
      EntityOp.QUERY_BY_KEY_SUCCESS,
      EntityOp.QUERY_MANY_SUCCESS,
      EntityOp.SAVE_ADD_MANY_SUCCESS,
      EntityOp.SAVE_UPSERT_MANY_SUCCESS,
      EntityOp.SAVE_DELETE_MANY_SUCCESS,
      EntityOp.SAVE_UPDATE_ONE_SUCCESS,
      EntityOp.SAVE_UPDATE_MANY_SUCCESS,
    ),
    switchMap((error: any) => [
      loadingFinished(),
    ]),
  ));

  constructor(
    private actions$: Actions,
  ) {}

}

export * from './combine.reducer';
