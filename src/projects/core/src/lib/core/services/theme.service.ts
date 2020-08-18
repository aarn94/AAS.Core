import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { AnalyticsService } from '../modules/analytics/services';
import { LogService } from '../../shared/services';

@Injectable()
export class ThemeService {

  private defaultDarkMode: boolean = false;
  private themeKey: string = 'darkMode';

  constructor(private storageProvider: StorageService,  private analytics: AnalyticsService, private logService: LogService) { }

   getDefaultTheme(): boolean {
     return this.defaultDarkMode;
   }

   restoreTheme(): boolean {
    const themeData: string = this.storageProvider.getString(this.themeKey);

    if (!themeData) {
      return false;
    }

    this.logService.debug('restore darkTheme enabled ' + themeData);

    return themeData === 'true';
   }

   saveTheme(theme: boolean): void {

    this.logService.debug('setting darkTheme enabled to ' + theme);

    this.analytics.trackAction(
      'analytics.categories.settings.theme_change_action',
      'analytics.categories.settings.name',
      'analytics.labels.theme',
      theme.toString());

    this.storageProvider.storeString(this.themeKey, String(theme));

   }
}
