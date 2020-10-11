import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Injectable()
export class SeoService {

  constructor(private meta: MetaService, @Inject(DOCUMENT) private dom: any) { }

    setTitle(title: string, override?: boolean): void {
      this.meta.setTitle(title, override);
    }
    setTag(key: string, value: string): void {
      this.meta.setTag(key, value);
    }
    update(currentUrl: string, metaSettings?: any): void {
      this.meta.update(currentUrl, metaSettings);
    }
    removeTag(key: string): void {
      this.meta.removeTag(key);
    }

    createCanonicalURL(url?: string): void {
      const canURL = url === undefined ? this.dom.URL : url;
      const link: HTMLLinkElement = this.dom.createElement('link');

      link.setAttribute('rel', 'canonical');
      this.dom.head.appendChild(link);
      link.setAttribute('href', canURL);
   }
}
