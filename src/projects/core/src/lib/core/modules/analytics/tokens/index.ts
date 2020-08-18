import { IAnalyticsSettings } from '../interfaces';
import { InjectionToken } from '@angular/core';

export const ANALYTICS_SETTINGS = new InjectionToken<IAnalyticsSettings>('AnalyticsSettings');
