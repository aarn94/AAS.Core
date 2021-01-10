import { KeyValue } from '@angular/common';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { patternValidator } from './pattern.validator';

export function patternDisplayValidator(pattern: string, displayName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const validators: KeyValue<RegExp, ValidationErrors>[] = [
      {key: new RegExp(pattern), value: {pattern: displayName}},
    ];

    const keyValue: KeyValue<RegExp, ValidationErrors> = validators[0];
    const simpleValidationResult: ValidationErrors = patternValidator(
      control,
      keyValue.key,
      keyValue.value,
    );

    if (simpleValidationResult) {
      return simpleValidationResult;
    }

    return null;

  };
}
