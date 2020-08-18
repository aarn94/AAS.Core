
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { components } from './components';
import { directives } from './directives';

@NgModule({
  declarations: [
    ...directives,
    ...components,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    Angulartics2Module,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    HttpClientModule,
    Angulartics2Module,
    ...directives,
    ...components,
  ],
})
export class SharedModule {}
