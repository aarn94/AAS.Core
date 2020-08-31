export interface IAppError {
    reason?: string;
    message?: string;
    code: string;
  }

export function isAppError(arg: any): arg is IAppError {
    return arg !== undefined && arg != null && arg.code;
}
