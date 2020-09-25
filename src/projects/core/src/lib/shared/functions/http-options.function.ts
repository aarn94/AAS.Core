import { IHttpOptions } from '../interfaces';

export function getOptions(): IHttpOptions {
  return {
    headers: ({
      'Content-Type': 'application/json',
      'Accept': 'application/json; charset=utf-8',
    }),
  };
}


export function getAnonymousOptions(): IHttpOptions {
  return {
    headers: ({
      'Content-Type': 'application/json',
      'Accept': 'application/json; charset=utf-8',
    }),
    withCredentials: false,
  };
}
