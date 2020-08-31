import { InjectionToken } from '@angular/core';

import { IAnalyticsSettings } from '../interfaces';

export const ANALYTICS_SETTINGS = new InjectionToken<IAnalyticsSettings>('AnalyticsSettings');
