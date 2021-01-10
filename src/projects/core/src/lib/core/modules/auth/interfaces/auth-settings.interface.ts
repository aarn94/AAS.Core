export interface IAuthSettings {
  enabled?: boolean;
  urlPlace?: 'raw' | 'config';
  url?: string;
  unauthorizedRedirectTo?: string;
  authorizedRedirectTo?: string;
  resetPasswordPhoneRoute?: string;
  resetPasswordEmailRoute?: string;
  phoneVerificationRoute?: string;
  emailVerificationRoute?: string;
  refreshTokenKeyName?: string;
  accessTokenKeyName?: string;
}
