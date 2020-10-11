import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeUrl', pure: true })

export class SafeUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(value: any, args?: unknown): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
