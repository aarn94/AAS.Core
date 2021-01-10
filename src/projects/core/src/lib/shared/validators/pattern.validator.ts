import { AbstractControl, ValidationErrors } from '@angular/forms';

export function patternValidator(
  control: AbstractControl,
  regex: RegExp,
  error: ValidationErrors,
): ValidationErrors {
  if (!control.value) {
    // if control is empty return no error
    return null;
  }
  // test the value of the control against the regexp supplied
  const valid = regex.test(control.value);

  // if true, return no error (no error), else return error passed in the second parameter
  return valid ? null : error;
}
