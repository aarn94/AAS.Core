
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { ReactiveComponentModule } from '@ngrx/component';
import { LoadingBarComponent, LoadingBarModule } from '@ngx-loading-bar/core';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { FullWidthComponent, FeatherIconsComponent, FormFieldComponent, TapToTopComponent } from './components';
import { DebounceClickDirective, StoreLinkDirective } from './directives';
import { SortPipe } from './pipes';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';

@NgModule({
  declarations: [
    DebounceClickDirective,
    StoreLinkDirective,
    FormFieldComponent,
    TapToTopComponent,
    FeatherIconsComponent,
    SortPipe,
    EnumToArrayPipe,
    FullWidthComponent,
  ],
  providers: [
    SortPipe,
    EnumToArrayPipe,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    Angulartics2Module,
    RouterModule,
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
    Angulartics2Module,
    ReactiveComponentModule,
    ContentLoaderModule,
    DebounceClickDirective,
    StoreLinkDirective,
    FormFieldComponent,
    TapToTopComponent,
    FeatherIconsComponent,
    LoadingBarComponent,
    FullWidthComponent,
    FontAwesomeModule,
    SortPipe,
    EnumToArrayPipe,
  ],
})
export class AASSharedModule { }
