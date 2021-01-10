import { Inject, Injectable, Optional } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AUTH_SETTINGS, IAuthSettings } from '..';
import { defaultAuthorizedRedirectTo } from '../../../../shared/constants';
import { IAASState } from '../../../../state';
import { go } from '../../../store/actions';
import { AuthService } from '../services';

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {

  private route: string;
  constructor(private authService: AuthService, private store: Store<IAASState>,
              @Optional() @Inject(AUTH_SETTINGS) authSettings: IAuthSettings) {
      this.route = authSettings?.authorizedRedirectTo ?? defaultAuthorizedRedirectTo;
    }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | UrlTree | Observable<boolean | UrlTree> | Promise < boolean | UrlTree > {
      return this.authService.isAuthenticated().pipe(
      map((value: boolean) => {
        if (!value) {
            return true;
        }
        const url: string = '/' + this.route;

        this.store.dispatch(go({ data: [url]}));

        return false;
      }));
    }
  }
