import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { go, replace } from '../../core/store/actions';
import { IAASState } from '../../state/interfaces';

@Directive({
  selector: '[aasStoreLink]',
})
export class StoreLinkDirective extends RouterLink {

  @Input() enableBack: boolean = true;

  @Input() aasStoreLink: string;

  constructor(private store: Store<IAASState>,
              router: Router,
              route: ActivatedRoute,
              renderer: Renderer2,
              elRef: ElementRef) {
        super(router, route, '', renderer, elRef);

  }

  onClick(): boolean {
    if (this.enableBack) {
      this.store.dispatch(go({data:  [this.aasStoreLink]}));
    } else {
      this.store.dispatch(replace({data:  [this.aasStoreLink]}));
    }

    return true;
  }

}
