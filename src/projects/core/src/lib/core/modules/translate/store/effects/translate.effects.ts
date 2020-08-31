import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';

import { IProps } from '../../../../../state/interfaces';
import { InternalizationService } from '../../services';
import { languageModified, TRANSLATE_ACTIONS } from '../actions';

@Injectable()
export class TranslateEffects {
  loadLanguage$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(TRANSLATE_ACTIONS.languageload),
    switchMap(() => {
     const lang: string = this.internalizationService.restoreLanguage();

     return of(TRANSLATE_ACTIONS.languageloadSuccess({data: lang}));
    }),
    delay(400),
  ),
);

languageModified$: Observable<IProps<string>> = createEffect(() =>
  this.actions$.pipe(
    ofType(languageModified),
    tap((lang: IProps<string>) =>
    this.internalizationService.saveLanguage(lang.data)),
  ), { dispatch: false },
);

  constructor(private actions$: Actions, private internalizationService: InternalizationService) {

}
}
