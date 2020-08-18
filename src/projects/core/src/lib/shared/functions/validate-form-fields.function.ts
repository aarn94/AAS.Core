import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export function validateFormFields(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach((field: string) => {
    const control: AbstractControl = formGroup.get(field);

    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      validateFormFields(control);
    }
  });
}
