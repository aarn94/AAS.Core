import { Inject, Injectable } from '@angular/core';
import { Optional } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AUTH_SETTINGS, IAuthSettings } from '..';
import { defaultUnAuthorizedRedirectTo } from '../../../../shared/constants';
import { IAASState } from '../../../../state';
import { go } from '../../../store/actions';
import { AuthService } from '../services';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  private route: string;
  constructor(private authService: AuthService, private store: Store<IAASState>,
              @Optional() @Inject(AUTH_SETTINGS) authSettings: IAuthSettings) {
      this.route = authSettings?.unauthorizedRedirectTo ?? defaultUnAuthorizedRedirectTo;
    }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | UrlTree | Observable<boolean | UrlTree> | Promise < boolean | UrlTree > {
      return this.authService.isAuthenticated().pipe(
      map((value: boolean) => {
        if (value) {
            return true;
        }
        this.store.dispatch(go({ data: ['/' + this.route],
        extras: { queryParams: { redirectUrl: state.url } }}));

        return false;
      }));
    }
}
