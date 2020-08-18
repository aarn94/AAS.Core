import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[aasDebounceClick]',
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input()
  debounceTime: number = 500;
  @Output()
  debounceClick: EventEmitter<unknown> = new EventEmitter<unknown>();

  private clicks: Subject<unknown> = new Subject<unknown>();
  private subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.clicks.pipe(
      debounceTime(this.debounceTime),
    ).subscribe((e: unknown) => {
      return this.debounceClick.emit(e);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  // tslint:disable-next-line:no-any for nativescript it does not work
  clickEvent(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
