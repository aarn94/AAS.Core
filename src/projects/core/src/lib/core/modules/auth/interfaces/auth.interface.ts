import { JwtHelperService } from '@auth0/angular-jwt';

export interface IAuthToken {
    unique_name: string;
    exp: number;
    user_name: string;
    role: string;
    authorities: string[];
    jti: string;
    client_id: string;
    scope: string;
    nbf: number;
    iat: number;

    token: string;

    isExpired(): boolean;
}

// tslint:disable: variable-name
export class AuthToken implements IAuthToken {

  get token(): string {
    return this._token;
  }

  unique_name: string;
  exp: number;
  role: string;
  user_name: string;
  phoneNumber: string;
  email: string;
  authorities: string[];
  jti: string;
  client_id: string;
  scope: string;
  nbf: number;
  iat: number;

  private readonly roleClaim: string = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
  private readonly emailClaim: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';
  private readonly phoneClaim: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone';
  private readonly nameClaim: string = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname';

  private _token: string;
  private readonly helper: JwtHelperService = new JwtHelperService();

  constructor(token: string) {
    if (token) {
      this._token = token;
      const decoded: IAuthToken = this.helper.decodeToken(token);

      this.unique_name = decoded.unique_name;
      this.role = decoded[this.roleClaim];
      this.email = decoded[this.emailClaim];
      this.phoneNumber = decoded[this.phoneClaim];
      this.user_name = decoded[this.nameClaim];
      this.exp = decoded.exp;
      this.authorities = decoded.authorities;
      this.jti = decoded.jti;
      this.client_id = decoded.client_id;
      this.scope = decoded.scope;
      this.nbf = decoded.nbf;
      this.iat = decoded.iat;

    }
  }

  isExpired(): boolean {
    return this.exp * 1000 < Date.now();
  }

}
