import { AnalyticsServerService } from '../services';

export function analyticsServerLoader(): AnalyticsServerService {
  return new AnalyticsServerService();
}
