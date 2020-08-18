import { NgModule, OnDestroy } from '@angular/core';

@NgModule()
export abstract class OnDestroyLifeCycle implements OnDestroy {
  ngOnDestroy(): void {}
}
