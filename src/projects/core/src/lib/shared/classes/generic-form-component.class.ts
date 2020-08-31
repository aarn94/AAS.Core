
import { NgModule } from '@angular/core';
import { NgFormsManager } from '@ngneat/forms-manager';
import { FormKeys } from '@ngneat/forms-manager/lib/types';

import { OnDestroyLifeCycle } from './on-destroy-life-cycle.class';

@NgModule()
export abstract class GenericFormComponent<T> extends OnDestroyLifeCycle {

  get formName(): FormKeys<T> { return this.formKey; }
  abstract get formKey(): keyof T;

  constructor(protected formManager: NgFormsManager<T>) {
    super();
  }

  OnDestroy(): void {
    if (this.formKey) {
      this.formManager.unsubscribe(this.formName);
    }
  }
}
