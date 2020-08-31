
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { ReactiveComponentModule } from '@ngrx/component';
import { LoadingBarComponent, LoadingBarModule } from '@ngx-loading-bar/core';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { FeatherIconsComponent, FormFieldComponent, TapToTopComponent } from './components';
import { DebounceClickDirective, StoreLinkDirective } from './directives';
import { SortPipe } from './pipes';

@NgModule({
  declarations: [
    DebounceClickDirective,
    StoreLinkDirective,
    FormFieldComponent,
    TapToTopComponent,
    FeatherIconsComponent,
    SortPipe,
  ],
  providers: [
    SortPipe,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    Angulartics2Module,
    RouterModule,
    HttpClientModule,
    ContentLoaderModule,
    LoadingBarModule,
    ReactiveComponentModule,
    FontAwesomeModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    HttpClientModule,
    Angulartics2Module,
    ReactiveComponentModule,
    ContentLoaderModule,
    DebounceClickDirective,
    StoreLinkDirective,
    FormFieldComponent,
    TapToTopComponent,
    FeatherIconsComponent,
    LoadingBarComponent,
    FontAwesomeModule,
    SortPipe,
  ],
})
export class AASSharedModule {}
