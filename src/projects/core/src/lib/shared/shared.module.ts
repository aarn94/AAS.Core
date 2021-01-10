
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

import { FeatherIconsComponent, FormFieldComponent, FullWidthComponent, TapToTopComponent } from './components';
import { BackgroundColorDirective, DebounceClickDirective, MoveToHeadDirective, StoreLinkDirective } from './directives';
import { EnumToArrayPipe, SafeHtmlPipe, SafeUrlPipe, SortPipe } from './pipes';

@NgModule({
  declarations: [
    DebounceClickDirective,
    StoreLinkDirective,
    FormFieldComponent,
    TapToTopComponent,
    FeatherIconsComponent,
    SortPipe,
    SafeUrlPipe,
    EnumToArrayPipe,
    FullWidthComponent,
    SafeHtmlPipe,
    MoveToHeadDirective,
    BackgroundColorDirective,
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
    SafeHtmlPipe,
    SafeUrlPipe,
    MoveToHeadDirective,
    BackgroundColorDirective,
  ],
})
export class AASSharedModule { }
