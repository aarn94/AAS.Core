import { Injectable, Optional, Inject } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { LogService } from '../../../../shared/services';
import { Angulartics2 } from 'angulartics2';

import { IAnalyticsProperties, IAnalyticsSettings } from '../interfaces';
import { ANALYTICS_SETTINGS } from '../tokens';
import { defaultAnalyticsEnabled } from '../../../../defaults.model';

@Injectable()
export class AnalyticsService {
  constructor(private readonly angulartics: Angulartics2, private log: LogService, private config: ConfigService,
    @Optional() @Inject(ANALYTICS_SETTINGS) analyticsSettings: IAnalyticsSettings){
      const enabled: boolean = analyticsSettings?.enabled ?? defaultAnalyticsEnabled;

      this.devMode(enabled);
  }

  trackAction(actionKey: string, categoryKey: string, labelKey: string, value: string): void {
    if (!this.devMode()) {
      this.log.debug('track action key ' + actionKey);
      const properties: IAnalyticsProperties = {
        category: this.config.getSettings(categoryKey),
        label: this.config.getSettings(labelKey),
        value,
      };

      this.angulartics.eventTrack.next({
        action: this.config.getSettings(actionKey),
        properties,
      });
    }
  }

  pageTrack(path: string): void {
    if (!this.devMode()) {
      this.log.debug('track page ' + path);
      this.angulartics.pageTrack.next({ path });
    }
  }

  identify(properties: any): void {
    if (!this.devMode()) {
      this.angulartics.setUserProperties.next(properties);
    }
  }

  private devMode(enable?: boolean): boolean {
    if (typeof enable !== 'undefined') {
      this.angulartics.settings.developerMode = enable;
    }

    return this.angulartics.settings.developerMode;
  }
}
