import { Injectable } from '@angular/core';
import { IConsole } from '../interfaces';

  // tslint:disable:no-any
@Injectable()
export class ConsoleService implements IConsole {

  log(m: any): void {
    return;
  }

  debug(m: any): void {
    return;
  }

  error(m: any): void {
    return;
  }

  warn(m: any): void {
    return;
  }

  info(m: any): void {
    return;
  }
}
