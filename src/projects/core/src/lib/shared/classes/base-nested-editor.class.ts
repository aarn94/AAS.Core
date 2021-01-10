import { Directive, Input, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective } from '@angular/forms';

@Directive()
export abstract class BaseNestedEditorDirective<T> implements ControlValueAccessor {

  @ViewChild(FormControlDirective, {static: true})
  formControlDirective: FormControlDirective;

  @Input()
  formControl: FormControl;

  @Input()
  formControlName: string;

  protected constructor(protected controlContainer: ControlContainer) {
  }

  get control(): FormControl {
    return (this.formControl || this.controlContainer.control.get(this.formControlName)) as FormControl;
  }

  clearInput(): void {
    this.control.setValue('');
  }

  registerOnTouched(fn: unknown): void {
    this.formControlDirective?.valueAccessor.registerOnTouched(fn);
  }

  registerOnChange(fn: unknown): void {
    this.formControlDirective?.valueAccessor.registerOnChange(fn);
  }

  writeValue(obj: unknown): void {
    this.formControlDirective?.valueAccessor.writeValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    this.formControlDirective?.valueAccessor.setDisabledState(isDisabled);
  }

}
