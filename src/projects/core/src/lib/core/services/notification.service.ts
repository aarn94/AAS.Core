import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {
  constructor(private toastrService: ToastrService) {
  }

  showError(message: string, title: string = 'Error'): void {
      this.toastrService.error(message, title);
  }

  showInfo(message: string, title: string = 'Info'): void {
    this.toastrService.info(message, title);
  }

  showSuccess(message: string, title: string = 'Success'): void {
    this.toastrService.success(message, title);
  }
}
