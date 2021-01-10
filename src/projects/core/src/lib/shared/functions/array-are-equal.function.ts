export function arrayAreEqual<T>(first: T[], second: T[]): boolean {
  if (first.length === 0 && second.length === 0) {
    return true;
  }
  if (first.length === 0 || second.length === 0) {
    return false;
  }

  return first.filter((x: T) => second.includes(x)).length !== 0;
}
