import { HttpErrorResponse } from '@angular/common/http';
export interface IEmailConfirmationError {
  error: HttpErrorResponse;
  email: string;
}

export interface ILoginError {
  error: HttpErrorResponse;
  login: string;
}

export interface IRepeatConfirmationProcessRequest {
  email?: string;
  phone?: string;
}
