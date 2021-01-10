import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Dictionary } from 'lodash';

import { ErrorCallback, ITranslationErrorsSettings } from '../interfaces';
import { ERRORS_SETTINGS } from '../tokens';
import {error} from 'ng-packagr/lib/utils/log';

export function translateErrorsLoader(translate: TranslateService, injector: Injector): Dictionary<string | ErrorCallback> {
  const settings: ITranslationErrorsSettings = injector.get(ERRORS_SETTINGS, defaultTranslateErrors(translate));

  return settings;
}

export function defaultTranslateErrors(translate: TranslateService): Dictionary<string | ErrorCallback> {
  return {
     required: (error: any) => translate.instant('SHARED.ERRORS.REQUIRED'),
     min: (error: any) => translate.instant('SHARED.ERRORS.MIN', {min: error.min}),
     minlength: (error: any) => translate.instant('SHARED.ERRORS.MIN_LENGTH', {requiredLength: error.requiredLength}),
     email: (error: any) => translate.instant('SHARED.ERRORS.EMAIL'),
     isTelephoneNumber: (error: any) => translate.instant('SHARED.ERRORS.PHONE'),
     noPasswordMatch: (error: any) => translate.instant('SHARED.ERRORS.PASSWORD_MATCH'),
     hasNumber: (error: any) => translate.instant('SHARED.ERRORS.NUMBER'),
     hasCapitalCase: (error: any) => translate.instant('SHARED.ERRORS.CAPITAL_CASE'),
     hasSmallCase: (error: any) => translate.instant('SHARED.ERRORS.SMALL_CASE'),
     pattern: (error: any) => translate.instant('SHARED.ERRORS.PATTERN', {pattern: error}),
  };
}
