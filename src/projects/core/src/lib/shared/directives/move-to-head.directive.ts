import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMoveToHead]',
})
export class MoveToHeadDirective implements OnDestroy, OnInit {

  constructor(
    private renderer?: Renderer2,
    private elRef?: ElementRef,
    @Inject(DOCUMENT) private document?: any,
  ) { }

  ngOnInit(): void {
    this.renderer.appendChild(this.document.head, this.elRef.nativeElement);
    this.renderer.removeAttribute(this.elRef.nativeElement, 'appmovetohead');
  }

  ngOnDestroy(): void {
    this.renderer.removeChild(this.document.head, this.elRef.nativeElement);
  }

}
