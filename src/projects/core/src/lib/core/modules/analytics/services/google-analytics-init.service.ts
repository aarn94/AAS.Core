import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Observable, of, Subscriber } from 'rxjs';

import { LogService } from '../../../../shared/services/log.service';

declare global {
  interface Window { ga: any; }
}

// @dynamic
@Injectable()
export class GoogleAnalyticsInitService {

  // The source for the load
  private googleAnalyticsScript = {
    loaded: false,
    url: 'https://www.google-analytics.com/analytics.js',
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private log: LogService,
              @Inject(DOCUMENT) private dom: Document, private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
  }

  // Init the GA infrastructure
  loadScript(production: boolean, webtrackerId: string): Observable<unknown> {
    return new Observable((observer: Subscriber<unknown>) => {
      try {
        if (!this.googleAnalyticsScript.loaded) {
          // Check if we are at browser
          if (isPlatformBrowser(this.platformId)) {
            // Create new scipt element
            const scriptElm: HTMLScriptElement = this.dom.createElement('script');

            scriptElm.src = this.googleAnalyticsScript.url;
            scriptElm.type = 'text/javascript';
            scriptElm.async = true;
            scriptElm.onload = () => {
              // Prevent from load second time
              this.googleAnalyticsScript.loaded = true;
            };

            // Define GA object
            window.ga = window.ga || function () { (window.ga.q = window.ga.q || []).push(arguments); };
            window.ga.l = +new Date;

            // const analyticsMode: string = production ? 'auto' : 'none';
            const analyticsMode: string = 'auto';
            // Set some Google Analytics stuff

            window.ga('create', webtrackerId, analyticsMode);

            // Add to document
            this.dom.body.appendChild(scriptElm);

            this.angulartics2GoogleAnalytics.startTracking();

          }
        }
        observer.next();
        observer.complete();
      } catch (error) {
        this.log.error(`Could not load analytics: ${error}`);
        observer.error(error);
      }
    });
    // Check already loaded

  }
}
