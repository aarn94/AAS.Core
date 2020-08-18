
import { CommonEffects } from './common.effects';
import { NavigationEffects } from './navigation.effects';
import { AnalyticsEffects } from '../../modules/analytics/store/effects';
import { TranslateEffects } from '../../modules/translate/store/effects';
// tslint:disable-next-line:typedef
export const effects = [
  NavigationEffects,
  CommonEffects,
  AnalyticsEffects,
  TranslateEffects,
];
