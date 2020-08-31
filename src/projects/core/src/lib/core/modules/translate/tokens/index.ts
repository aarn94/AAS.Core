import { InjectionToken } from '@angular/core';

import { ITranslationErrorsSettings, ITranslationSettings } from '../interfaces';

export const TRANSLATION_SETTINGS = new InjectionToken<ITranslationSettings>('TranslationSettings');

export const ERRORS_SETTINGS = new InjectionToken<ITranslationErrorsSettings>('ErrorSettings');
