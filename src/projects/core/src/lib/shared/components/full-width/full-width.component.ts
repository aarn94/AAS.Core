import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'aas-full-width',
  templateUrl: './full-width.component.html',
  styleUrls: ['./full-width.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullWidthComponent {

  @HostBinding('class.full') get full(): boolean {
    return this.active;
  }

  @Input()
  buttonClass: string = 'pull-right clickable primary';

  private active: boolean;

  constructor() {

  }

  toggle = (): void => {
    this.active = !this.active;
  }

}
