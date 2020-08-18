import { forwardRef, Inject, Injectable } from '@angular/core';
import { ConfigService } from '@ngx-config/core';

import { ConsoleService } from './console.service';
import { LogLevel, IsAtLeast } from '../enums';

@Injectable()
export class LogService {
  constructor(private readonly config: ConfigService, @Inject(forwardRef(() => ConsoleService)) readonly logger: ConsoleService) {}

  // debug (standard output)
  debug(msg: any): void {
    const level: LogLevel = this.config.getSettings('logging.level');

    if (IsAtLeast(LogLevel.Debug, level)) {
      // console.debug does not work on {N} apps... use `log`
      this.logger.log(msg);
    }
  }

  // error
  error(err: any): void {
    const level: LogLevel = this.config.getSettings('logging.level');

    if (IsAtLeast(LogLevel.Error, level)) {
      this.logger.error(err);
    }
  }

  // warn
  warn(err: any): void {
    const level: LogLevel = this.config.getSettings('logging.level');

    if (IsAtLeast(LogLevel.Warn, level)) {
      this.logger.warn(err);
    }
  }

  // info
  info(err: any): void {
    const level: LogLevel = this.config.getSettings('logging.level');

    if (IsAtLeast(LogLevel.Info, level)) {
      this.logger.info(err);
    }
  }
}
