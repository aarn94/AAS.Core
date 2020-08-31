import { forwardRef, Inject, Injectable, resolveForwardRef } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IConfirmationDialogData } from '../interfaces/confirmation-dialog.interface';

@Injectable()
export class ConfirmationService {
  constructor(@Inject(forwardRef(() => ConfirmationProvider)) private provider: ConfirmationProvider) {

  }

  confirm(data: IConfirmationDialogData): Observable<boolean> {
    return resolveForwardRef(this.provider).confirm(data);
  }
}

@Injectable()
export class ConfirmationProvider {
  confirm(data: IConfirmationDialogData): Observable<boolean> {
    return of(true);
  }
}
