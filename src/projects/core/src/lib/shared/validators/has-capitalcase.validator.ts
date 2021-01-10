import { KeyValue } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { patternValidator } from './pattern.validator';

export function hasCapitalCaseValidator(control: AbstractControl): ValidationErrors {
  const validators: KeyValue<RegExp, ValidationErrors>[] = [
    { key: new RegExp('[A-Z]{1,}'), value: { hasCapitalCase: true } },
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
