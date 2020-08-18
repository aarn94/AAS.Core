import { Injector } from '@angular/core';

import { OnDestroyLifeCycle } from './on-destroy-life-cycle.class';

export abstract class BaseComponent extends OnDestroyLifeCycle {

  constructor(private injector: Injector) {
    super();
  }
}
