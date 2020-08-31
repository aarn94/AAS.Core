import { InjectionToken } from '@angular/core';

import { IAuthSettings } from '../interfaces';

export const AUTH_SETTINGS = new InjectionToken<IAuthSettings>('AuthSettings');
