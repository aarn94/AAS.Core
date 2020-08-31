import { Action, createReducer, on } from '@ngrx/store';

import { IProps } from '../../../../../state/interfaces';
import { TRANSLATE_ACTIONS } from '../actions';

export interface ITranslateState {
  language: string;
}

const initialState: ITranslateState = {
  language: null,
};

const _translateReducer = createReducer(
    initialState,
    on(TRANSLATE_ACTIONS.languageloadSuccess, TRANSLATE_ACTIONS.languageModified, (state: ITranslateState, result: IProps<string>) => {
      return {...state, language: result.data};
    }),
  );

export function translateReducer(state: ITranslateState, action: Action): ITranslateState {
    return _translateReducer(state, action) as ITranslateState;
}

export const translateInitialState = initialState;
