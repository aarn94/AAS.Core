import { forwardRef, Inject, Injectable } from '@angular/core';
import { ConfigService } from '@ngx-config/core';

import { IsAtLeast, LogLevel } from '../../shared/enums';

import { ConsoleService } from './console.service';

@Injectable()
export class LogService {

  private defaultLevel: LogLevel = LogLevel.Warn;
  constructor(private readonly config: ConfigService, @Inject(forwardRef(() => ConsoleService)) readonly logger: ConsoleService) {}

  // debug (standard output)
  debug(msg: any): void {
    const level: LogLevel = this.config.getSettings('logging.level', this.defaultLevel);

    if (IsAtLeast(LogLevel.Debug, level)) {
      // console.debug does not work on {N} apps... use `log`
      this.logger.log(msg);
    }
  }

  trace(msg: any, module: string): void {
    const level: LogLevel = this.config.getSettings('logging.level', this.defaultLevel);
    const modules: string[] = this.config.getSettings('logging.traces', []);

    if (IsAtLeast(LogLevel.Trace, level) && modules.includes(module)) {
      this.logger.log(msg);
    }
  }

  // error
  error(err: any): void {
    const level: LogLevel = this.config.getSettings('logging.level', this.defaultLevel);

    if (IsAtLeast(LogLevel.Error, level)) {
      this.logger.error(err);
    }
  }

  // warn
  warn(err: any): void {
    const level: LogLevel = this.config.getSettings('logging.level', this.defaultLevel);

    if (IsAtLeast(LogLevel.Warn, level)) {
      this.logger.warn(err);
    }
  }

  // info
  info(err: any): void {
    const level: LogLevel = this.config.getSettings('logging.level', this.defaultLevel);

    if (IsAtLeast(LogLevel.Info, level)) {
      this.logger.info(err);
    }
  }
}
