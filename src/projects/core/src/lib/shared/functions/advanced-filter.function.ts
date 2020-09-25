
import {isNil} from 'lodash';

export function filter<T>(data: T[], query: string, field: string): T[] {

  const OR: string = ' || ';
  const values: string[] = query.split(OR);


  return data.filter((item: T) => values.some((value: string) =>
     (!isNil(item[field]) ? item[field] : '')
     .toString()
     .trim()
     .toLowerCase()
     .includes(value.toLowerCase().trim()),
  ));
}
