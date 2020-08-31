import { Injector } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { Angulartics2 } from 'angulartics2';

import { LogService } from '../../../../core/services';
import { IAnalyticsSettings } from '../interfaces';
import { AnalyticsService } from '../services';
import { ANALYTICS_SETTINGS } from '../tokens';

export function analyticsLoader(angulartics: Angulartics2, log: LogService, config: ConfigService, injector: Injector): AnalyticsService {

  const analyticsSettings: IAnalyticsSettings = injector.get(ANALYTICS_SETTINGS, null);

  return new AnalyticsService(angulartics, log, config, analyticsSettings);
}
