import { isObject, transform } from 'lodash/fp';

export function differenceObject (targetObj: unknown, baseObj: unknown): unknown {
  const _transform = transform.convert({
    cap: false,
  });

  return _transform(iteratee(baseObj), null, targetObj);
}

export const iteratee = (baseObj: unknown) => (result: unknown, value: unknown, key: string) => {
  if (baseObj[key] === undefined) {
    result[key] = value;
  } else {
    const isBaseObj = isObject(baseObj[key]);
    const isTargetObj = isObject(value);

    if (isBaseObj) {
      result[key] = isTargetObj === true ? differenceObject(value, baseObj[key]) : value;
    }
  }
};
