import { Component, Input, OnInit } from '@angular/core';
import * as feather from 'feather-icons';

@Component({
  selector: 'aas-feather-icons',
  templateUrl: './feather-icons.component.html',
  styleUrls: ['./feather-icons.component.scss'],
})
export class FeatherIconsComponent implements OnInit {

  @Input('icon') icon: string;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      feather.replace();
    });
  }

}
