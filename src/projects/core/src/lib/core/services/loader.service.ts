import { Injectable } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

// @dynamic
@Injectable()
export class LoaderService {
  constructor(private loadingBar: LoadingBarService) {
  }

  show(): void {
    this.loadingBar.start();
  }

  stop(): void {
    this.loadingBar.stop();
  }
}
