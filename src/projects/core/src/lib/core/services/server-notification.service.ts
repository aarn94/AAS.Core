import { Injectable } from '@angular/core';

@Injectable()
export class ServerNotificationService {
  constructor() {
  }

  showError(message: string, title: string = 'Error'): void {
    console.log('notification error');
    console.log(message);
  }

  showInfo(message: string, title: string = 'Info'): void {
    console.log('notification info');
    console.log(message);
  }

  showSuccess(message: string, title: string = 'Success'): void {
    console.log('notification success');
    console.log(message);
  }

  showWarning(message: string, title: string = 'Warning'): void {
    console.log('notification warning');
    console.log(message);
  }
}
