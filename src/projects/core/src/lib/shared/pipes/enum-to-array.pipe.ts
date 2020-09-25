import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'enumToArray' })
export class EnumToArrayPipe implements PipeTransform {


  transform(enumVal: Object, ...args: string[]): string[] {
    const result = [];
    const keys = Object.keys(enumVal);
    const values = Object.values(enumVal);

    for (let i = 0; i < keys.length; i++) {
      result.push({ key: keys[i], value: values[i] });
    }

    return result;
  }
}
