import { TitleCasePipe } from '@angular/common';
import { AfterContentInit, Component, ContentChild, Input } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { OnDestroyLifeCycle } from '../../classes';

@Component({
  selector: 'aas-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent extends OnDestroyLifeCycle implements AfterContentInit {

  @ContentChild(FormControlName, {static : false}) input: FormControlName;

  @Input()
  elementClass: string = "text-danger support-text";

  _inline: boolean;
  name: string;

  constructor() {
    super();
  }

  ngAfterContentInit(): void {
    this.name = new TitleCasePipe().transform(this.input.name.toString());
  }

}
