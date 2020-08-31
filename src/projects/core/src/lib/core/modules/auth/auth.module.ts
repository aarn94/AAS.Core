import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { AASSharedModule } from '../../../shared';
import { InternalizationService } from '../translate/services';

import { authTextsLoader } from './factories';
import { AuthenticatedGuard, EmailGuard, EmailOrPhoneGuard, NotAuthenticatedGuard, PhoneGuard } from './guards';
import { TokenInterceptor } from './interceptors';
import { AuthenticationService, AuthService, AuthTextsService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AASSharedModule,
  ],
  providers: [
    AuthenticatedGuard,
    NotAuthenticatedGuard,
    EmailGuard,
    PhoneGuard,
    EmailOrPhoneGuard,
    AuthenticationService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: AuthTextsService,
      useFactory: authTextsLoader,
      deps: [InternalizationService],
    },
  ],
})
export class AuthModule {

  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('AuthModule is already  loaded. Import it in the AppModule only.');
    }
  }
  // tslint:disable-next-line:no-any
  static forRoot(configuredProviders: any[]): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: configuredProviders,
    };
  }
}
