import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class DefaultEntityCollectionService<T> extends EntityCollectionServiceBase<T> {
  constructor(route: string, serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(route, serviceElementsFactory);
  }

  getWithCache(): Observable<T[]> {
    return this.loaded$.pipe(
      switchMap((loaded: boolean) => loaded ? this.entities$ : this.getAll()),
    );
  }
}
