import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Dictionary } from 'lodash';

import { ErrorCallback, ITranslationErrorsSettings } from '../interfaces';
import { ERRORS_SETTINGS } from '../tokens';

export function translateErrorsLoader(translate: TranslateService, injector: Injector): Dictionary<string | ErrorCallback> {
  const settings: ITranslationErrorsSettings = injector.get(ERRORS_SETTINGS, defaultTranslateErrors(translate));

  return settings;
}

export function defaultTranslateErrors(translate: TranslateService): Dictionary<string | ErrorCallback> {
  return {
     required: error => translate.instant('SHARED.ERRORS.REQUIRED'),
  }
}
