import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { isNil } from 'lodash';

@Directive()
export abstract class BaseEditorDirective<T> implements ControlValueAccessor {

  @Input() disabled: boolean;
  @Input() label: string;

  protected innerValue: T;

  protected constructor(protected changeRef: ChangeDetectorRef) {
  }

  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    this.innerValue = value;
    this.onChange(value);
  }

  onChange(value: T | null): void {
  }

  onTouched(): void {
  }

  registerOnChange(fn: (text: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: T): void {
    if (!isNil(value)) {
      this.innerValue = value;
      this.onChange(value);
      this.onTouched();
      this.changeRef.markForCheck();
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  touch(): void {
    this.onTouched();
  }
}
