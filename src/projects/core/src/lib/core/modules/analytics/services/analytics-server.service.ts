import { Injectable } from '@angular/core';

@Injectable()
export class AnalyticsServerService {
  constructor() {
  }

  trackAction(actionKey: string, categoryKey: string, labelKey: string, value: string): void {

  }

  pageTrack(path: string): void {

  }

  identify(properties: any): void {

  }
}
