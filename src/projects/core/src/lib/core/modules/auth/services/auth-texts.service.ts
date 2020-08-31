import { Injectable } from '@angular/core';

import { InternalizationService } from '../../translate/services';

@Injectable()
export class AuthTextsService {

  constructor(private internalizationService: InternalizationService) {}

  getSuccessText(): string {
    return this.internalizationService.getTranslation('SHARED.TEXTS.SUCCESS');
  }

  getErrorText(): string {
    return this.internalizationService.getTranslation('SHARED.TEXTS.ERROR');
  }

  getGuardText(): string {
    return this.internalizationService.getTranslation('SHARED.TEXTS.GUARD');
  }

  getCommunicationProblemText(): string {
    return this.internalizationService.getTranslation('SHARED.TEXTS.COMMUNICATION_PROBLEM');
  }

  getPasswordChangedText(): string {
    return this.internalizationService.getTranslation('AUTH.FORGOT_PASSWORD.PASSWORD_CHANGED');
  }

  getResendSuccessText(): string {
    return this.internalizationService.getTranslation('AUTH.VERIFICATION.RESEND_SUCCESS');
  }

  getVerifiedSuccessText(): string {
    return this.internalizationService.getTranslation('AUTH.VERIFICATION_SUCCESS');
  }
}
