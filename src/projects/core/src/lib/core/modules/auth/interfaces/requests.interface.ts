export interface ISignInRequest {
  login: string;
  password: string;
  role?: string;
  redirectUrl?: string;
}

export interface IRevokeAccessTokenRequest {
  accessToken: string;
}

export interface IUseRefreshTokenRequest {
  refreshToken: string;
}

export interface IRevokeRefreshTokenRequest {
  refreshToken: string;
}

export interface ISignUpRequest {
  email?: string;
  phone?: string;
  password: string;
  captcha: string;
  userName: string;
  acceptTerms: boolean;
}

export interface IConfirmPhoneNumberRequest {
  phone: string;
  code: string;
}

export interface IConfirmEmailRequest {
  code: string;
  email: string;
}

export interface IResendConfirmationEmailRequest {
  email: string;
}

export interface IResendConfirmationSmsRequest {
  phone: string;
}

export interface IForgetPasswordRequest {
  email?: string;
  phone?: string;
}

export interface IResetPasswordRequest {
  emailProcessId?: string;
  phoneCode?: string;
  phone?: string;
  password: string;
}
