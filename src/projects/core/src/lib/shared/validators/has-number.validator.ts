import { KeyValue } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { patternValidator } from './pattern.validator';

export function hasNumberValidator(control: AbstractControl): ValidationErrors {
  const validators: KeyValue<RegExp, ValidationErrors>[] = [
    { key: new RegExp('[0-9]{1,}'), value: { hasNumber: true } },
    // {
    //   key: /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/,
    //   value: { hasSpecialCharacters: true },
    // },
  ];

  for (let i: number = 0; i < validators.length; i++) {
    const keyValue: KeyValue<RegExp, ValidationErrors> = validators[i];

    const simpleValidationResult: ValidationErrors = patternValidator(
      control,
      keyValue.key,
      keyValue.value,
    );

    if (simpleValidationResult) {
      return simpleValidationResult;
    }
  }

  return null;
}
