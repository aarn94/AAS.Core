import { Injectable } from '@angular/core';

@Injectable()
export class AnonymousRequestsProvider {

  private links: string[] = [];

  add(url: string): void {
    this.links.push(url);
  }

  isAnonymous(url: string): boolean {
    return this.links.some((search: string) => url?.toLocaleLowerCase().includes(search?.toLocaleLowerCase()));
  }
}
