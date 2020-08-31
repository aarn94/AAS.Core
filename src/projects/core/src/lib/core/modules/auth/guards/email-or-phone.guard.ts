import { Inject, Injectable, Optional } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AUTH_SETTINGS, IAuthSettings } from '..';
import { defaultUnAuthorizedRedirectTo } from '../../../../shared/constants';
import { IAASState } from '../../../../state/interfaces';
import { go, notificationSent } from '../../../store/actions';
import { AuthTextsService } from '../services';

@Injectable()
export class EmailOrPhoneGuard implements CanActivate {

  private route: string;

  constructor(private store: Store<IAASState>, private authTextsService: AuthTextsService,
              @Optional() @Inject(AUTH_SETTINGS) authSettings: IAuthSettings) {
    this.route = authSettings?.unauthorizedRedirectTo ?? defaultUnAuthorizedRedirectTo;
  }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | UrlTree | Observable<boolean | UrlTree> | Promise < boolean | UrlTree > {
    const email: string = route.queryParamMap.get('email');
    const phone: string = route.queryParamMap.get('phone');

    if (email || phone) {
        return true;
      }

    this.store.dispatch(go({data: ['/' + this.route]}));
    this.store.dispatch(notificationSent({data: {
      message: this.authTextsService.getGuardText(),
      title: this.authTextsService.getErrorText(),
    }}));

    return false;
    }
}
