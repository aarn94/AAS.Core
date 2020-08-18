export const enum LogLevel {
  Warn = 'Warn',
  Error = 'Error',
  Info = 'Info',
  Debug = 'Debug',
}

export function IsAtLeast(level: LogLevel, requiredLogLevel: LogLevel): boolean {
  switch (requiredLogLevel) {
    case LogLevel.Error:
        if (level !== LogLevel.Error) {
          return false;
        }

        return true;
        case LogLevel.Warn:
          if (level !== LogLevel.Error && level !== LogLevel.Warn) {
            return false;
          }

          return true;
        case LogLevel.Info:
          if (level === LogLevel.Debug) {
            return false;
          }

          return true;
        case LogLevel.Debug:
          return true;
        default:
        return false;
    }
}
