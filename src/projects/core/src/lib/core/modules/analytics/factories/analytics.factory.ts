import { ConfigService } from '@ngx-config/core';
import { LogService } from '../../../../shared/services';
import { Angulartics2 } from 'angulartics2';

import { AnalyticsService } from '../services';
import { IAnalyticsSettings } from '../interfaces';
import { Injector } from '@angular/core';
import { ANALYTICS_SETTINGS } from '../tokens';

export function analyticsLoader(angulartics: Angulartics2, log: LogService, config: ConfigService, injector: Injector): AnalyticsService {

  const analyticsSettings: IAnalyticsSettings = injector.get(ANALYTICS_SETTINGS);

  return new AnalyticsService(angulartics, log, config, analyticsSettings);
}
