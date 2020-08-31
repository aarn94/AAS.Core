import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'aas-tap-to-top',
  templateUrl: './tap-to-top.component.html',
  styleUrls: ['./tap-to-top.component.scss'],
})
export class TapToTopComponent implements OnInit {

  show: boolean = false;

  constructor(private viewScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  // @HostListener Decorator
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const number: number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if(number > 600) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  tapToTop(): void {
    this.viewScroller.scrollToPosition([0, 0]);
  }

}
