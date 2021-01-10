export function stringifyError (err: Error, filter: any = null, space: string = '\n'): unknown {
  const plainObject: unknown = {};

  Object.getOwnPropertyNames(err).forEach(function(key: string) {
    plainObject[key] = err[key];
  });

  return plainObject;
}
