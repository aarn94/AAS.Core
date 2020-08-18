export interface IConsole {
    log(m: string): void;

    debug(m: string): void;

    error(m: string): void;

    warn(m: string): void;

    info(m: string): void;
  }
