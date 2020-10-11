import {
  coerceArray as coerceArrayProperty,
  coerceBooleanProperty,
  coerceNumberProperty,
} from '@angular/cdk/coercion';

export const coerceBoolean = coerce(coerceBooleanProperty);
export const coerceArray = coerce(coerceArrayProperty);
export const coerceNumber = coerce(coerceNumberProperty);

// tslint:disable: no-invalid-this
export function coerce<
  T extends { [key in P]: O },
  P extends string | symbol = string | symbol,
  I = unknown,
  O = unknown
>(
  coerceFn: (value: I, self: T) => O,
  afterFn?: (value: O, self: T) => void,
): PropertyDecorator {
  return function (target: T, propertyKey: P): void {
    const _key = Symbol();

    target[_key] = target[propertyKey];
    Object.defineProperty(target, propertyKey, {
      get(): T {
        return this[_key];
      },
      set: afterFn
        ? function (v: I): void {
          this[_key] = coerceFn.call(this, v, this);
          afterFn.call(this, this[_key], this);
        }
        : function (v: I): void {
          this[_key] = coerceFn.call(this, v, this);
        },
    });
  };
}
