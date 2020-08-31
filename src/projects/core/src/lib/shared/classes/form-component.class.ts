
import { NgModule } from '@angular/core';
import { NgFormsManager } from '@ngneat/forms-manager';

import { OnDestroyLifeCycle } from './on-destroy-life-cycle.class';

@NgModule()
export abstract class FormComponent extends OnDestroyLifeCycle {

  abstract get formName(): string;

  constructor(protected formManager: NgFormsManager) {
    super();
  }

  OnDestroy(): void {
    if (this.formName) {
      this.formManager.unsubscribe(this.formName);
    }
  }
}
