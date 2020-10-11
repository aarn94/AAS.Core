import { InjectionToken } from '@angular/core';

import { IMetaInitSettings, ISeoSettings } from '../interfaces';

export const SEO_SETTINGS = new InjectionToken<ISeoSettings>('SeoSettings');

export const META_SETTINGS = new InjectionToken<IMetaInitSettings>('SeoSettings');
