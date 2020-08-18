import {
    appStarted,
    appStartedSuccess,
    handleAppException,
    handleCriticalException,
    handleException,
    loadingFinished,
    loadingStarted,
    modeLoad,
    modeLoadSuccess,
    modeModified,
    notificationSent,
} from './common.actions';
import { back, forward, go, replace } from './navigation.actions';

export const NAVIGATION_ACTIONS = {go, replace, forward, back};
export const COMMON_ACTIONS = {
    handleException,
    appStarted,
    appStartedSuccess,
    handleAppException,
    handleCriticalException,
    loadingFinished,
    loadingStarted,
    modeLoad,
    modeModified,
    modeLoadSuccess,
    notificationSent,
};
