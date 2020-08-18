import { Injectable } from '@angular/core';

@Injectable()
export class MetaInitService {

  private initialized: boolean = false;

  constructor() {

   }

   shouldDelay(text: string): boolean {
     return !text.startsWith('http') && !this.initialized;
   }

   disableDelay(): void {
     this.initialized = true;
   }
}
