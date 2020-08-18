import { ITranslationSettings } from '../interfaces';
import { InjectionToken } from '@angular/core';

export const TRANSLATION_SETTINGS = new InjectionToken<ITranslationSettings>('TranslationSettings');
