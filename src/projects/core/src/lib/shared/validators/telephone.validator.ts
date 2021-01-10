import { KeyValue } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { patternValidator } from './pattern.validator';

export function telephoneValidator(control: AbstractControl): ValidationErrors {

  const validation: KeyValue<RegExp, ValidationErrors> = {key: new RegExp(/^\+?(?:[0-9] ?){6,14}[0-9]$/), value: {isTelephoneNumber: true}};
  const simpleValidationResult: ValidationErrors = patternValidator(control, validation.key, validation.value);

  if (simpleValidationResult) {
    return simpleValidationResult;
  }

  return null;
}
