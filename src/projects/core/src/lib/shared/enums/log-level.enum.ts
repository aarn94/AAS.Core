export const enum LogLevel {
  Warn = 'Warn',
  Error = 'Error',
  Info = 'Info',
  Debug = 'Debug',
  Trace = 'Trace',
}

export function IsAtLeast(level: LogLevel, requiredLogLevel: LogLevel): boolean {
  switch (requiredLogLevel) {
    case LogLevel.Error:
      if (level !== LogLevel.Error) {
        return false;
      }

      return true;
    case LogLevel.Warn:
      if (level === LogLevel.Debug || level === LogLevel.Trace || level === LogLevel.Info) {
        return false;
      }

      return true;
    case LogLevel.Info:
      if (level === LogLevel.Debug || level === LogLevel.Trace) {
        return false;
      }

      return true;
    case LogLevel.Debug:
      if (level === LogLevel.Trace) {
        return false;
      }

      return true;
    case LogLevel.Trace:
      return true;
    default:
      return false;
  }
}
