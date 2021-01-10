import { IAuthToken } from '../interfaces';

export function isTokenExpired(token: IAuthToken): boolean {
  return token && token.exp * 1000 < Date.now();
}
