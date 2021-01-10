import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[aasBackgroundColor]',
})
export class BackgroundColorDirective implements OnInit {
  @Input('aasBackgroundColor') defaultColor: string = 'transparent';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor() {
  }

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
  }
}
