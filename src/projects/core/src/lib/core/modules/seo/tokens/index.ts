import { InjectionToken } from '@angular/core';

import { ISeoSettings } from '../interfaces';

export const SEO_SETTINGS = new InjectionToken<ISeoSettings>('SeoSettings');
