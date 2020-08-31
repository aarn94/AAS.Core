import { Action, ActionReducer, createFeatureSelector, createReducer, on } from '@ngrx/store';

import { IProps } from '../../../../../state/interfaces';
import { AuthToken, IAuthToken, ITokenResponse } from '../../interfaces';
import {
  loginRestored,
  loginSuccess,
  logout,
  refreshTokenRemoved,
  refreshTokenRestored,
  refreshTokenUsed,
  tokenRemoved,
  restoreLoginFailed,
  } from '../actions';
  // tslint:disable: typedef
export interface IAuthState {
  accessToken: IAuthToken;
  refreshToken: string;
  initialized: boolean;
}

export const initialState: IAuthState = {
  accessToken: null,
  refreshToken: null,
  initialized: false,
};

const _authReducer: ActionReducer<IAuthState, Action> = createReducer(
  initialState,
  on(loginSuccess, (state: IAuthState, change: IProps<ITokenResponse>) => {
    return { ...state, accessToken: new AuthToken(change.data.accessToken), refreshToken: change.data.refreshToken};
   }),
   on(refreshTokenUsed, (state: IAuthState, change: IProps<ITokenResponse>) => {
    return {...state, accessToken: new AuthToken(change.data.accessToken) };
   }),
   on(loginRestored, (state: IAuthState, change: IProps<IAuthToken>) => {
    return { ...state, accessToken: change.data, initialized: true };
   }),
   on(tokenRemoved, (state: IAuthState) => {
    return { ...state, accessToken: null };
   }),
   on(logout, (state: IAuthState) => {
    return { ...state, accessToken: null, refreshToken: null };
   }),
   on(refreshTokenRestored, (state: IAuthState, change: IProps<string>) => {
    return {...state, refreshToken: change.data };
   }),
   on(refreshTokenRemoved, (state: IAuthState) => {
    return {...state, refreshToken: null };
   }),
   on(restoreLoginFailed, (state: IAuthState) => {
    return {...state, refreshToken: null, initialized: true };
   }),
);

export function authReducer(state: IAuthState | undefined, action: Action) {
  return _authReducer(state, action);
}

