import { AnalyticsService } from './analytics.service';
import { GoogleAnalyticsInitService } from './google-analytics-init.service';

export const analyticsServices = [
    AnalyticsService,
    GoogleAnalyticsInitService,
];

export * from './analytics.service';
export * from './analytics-server.service';
export * from './google-analytics-init.service';
