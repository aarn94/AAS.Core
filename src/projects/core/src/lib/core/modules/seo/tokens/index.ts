import { ISeoSettings } from '../interfaces';
import { InjectionToken } from '@angular/core';

export const SEO_SETTINGS = new InjectionToken<ISeoSettings>('SeoSettings');
