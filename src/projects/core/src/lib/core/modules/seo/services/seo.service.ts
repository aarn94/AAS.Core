import { Injectable } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Injectable()
export class SeoService {

  constructor(private meta: MetaService) { }

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

}
