import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { IGo } from '../interfaces';

@Injectable()
export class RouterService {

  constructor(private router: Router, private location: Location) { }

  go(data: IGo): void {
    this.router.navigate(data.data, data.extras);
  }

  goWithReset(data: IGo): void {
    const replaceExtras: NavigationExtras = {
      ...data.extras,
      replaceUrl: true,
  };

    this.router.navigate(data.data, replaceExtras);
  }

  forward(): void {
    this.location.forward();
  }

  backward(): void {
    this.location.back();
  }
}
