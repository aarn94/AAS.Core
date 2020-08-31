import { Guid } from 'guid-typescript';
import { generate } from 'shortid';

export function generateShortNumber(): string {
   return generate();
}

export function generateGuid(): Guid {
  return Guid.create();
}
