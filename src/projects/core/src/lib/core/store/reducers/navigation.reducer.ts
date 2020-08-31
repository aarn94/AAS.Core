import { Action, createReducer, on } from '@ngrx/store';

import { IProps } from '../../../state/interfaces';
import { go, replace, setInitialPath } from '../actions';

export interface INavigationState {
    previousPath: string[];
    currentPath: string[];
}

const initialState: INavigationState = {
    previousPath: null,
    currentPath: null,
};

const _navigationReducer = createReducer(
    initialState,
    on(go, (state: INavigationState, result: IProps<string[]>) => {
      return result.data ? {...state, previousPath: state.currentPath, currentPath: result.data} : state;
    }),
    on(setInitialPath, (state: INavigationState, result: IProps<string[]>) => {
      return result.data ? {...state, currentPath: result.data} : state;
    }),
    on(replace, (state: INavigationState, result: IProps<string[]>) => {
      return result.data ? {...state, previousPath: null, currentPath: result.data} : state;
    }) ,
  );

export function navigationReducer(state: INavigationState, action: Action): INavigationState {
    return _navigationReducer(state, action) as INavigationState;
  }

export const navigationInitialState = initialState;
