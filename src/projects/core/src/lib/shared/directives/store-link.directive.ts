import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { NAVIGATION_ACTIONS } from '../../core/store/actions';
import { IAppState } from '../../state/interfaces';

@Directive({
  selector: '[aasStoreLink]',
})
export class StoreLinkDirective extends RouterLink {

  @Input() enableBack: boolean = true;

  @Input() aasStoreLink: string;

  constructor(private store: Store<IAppState>,
              router: Router,
              route: ActivatedRoute,
              renderer: Renderer2,
              elRef: ElementRef) {
        super(router, route, '', renderer, elRef);

  }

  onClick(): boolean {
    if (this.enableBack) {
      this.store.dispatch(NAVIGATION_ACTIONS.go({data:  [this.aasStoreLink]}));
    } else {
      this.store.dispatch(NAVIGATION_ACTIONS.replace({data:  [this.aasStoreLink]}));
    }

    return true;
  }

}
