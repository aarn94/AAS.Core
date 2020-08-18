import { Action, createReducer, on } from '@ngrx/store';

import { NAVIGATION_ACTIONS } from '../actions';
import { IProps } from '../../../state/interfaces';

export interface INavigationState {
    previousPath: string;
    currentPath: string;
}

const initialState: INavigationState = {
    previousPath: null,
    currentPath: null,
};

const _navigationReducer = createReducer(
    initialState,
    on(NAVIGATION_ACTIONS.go, (state: INavigationState, result: IProps<string[]>) => {
      return result.data ? {...state, previousPath: state.currentPath, currentPath: result.data} : state;
    }) ,
  );

export function navigationReducer(state: INavigationState, action: Action): INavigationState {
    return _navigationReducer(state, action) as INavigationState;
  }

export const navigationInitialState = initialState;
