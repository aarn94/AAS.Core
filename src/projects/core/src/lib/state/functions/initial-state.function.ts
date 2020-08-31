import { defaultAppState, IAASState } from '../interfaces';
declare var window: any;

export function getInitialState(): IAASState {
    if (typeof window !== 'undefined' && window.__STATE__ !== 'undefined') {
      return window.__STATE__;
    } else {
      return defaultAppState;
    }
}
