import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { ConfigService } from '@ngx-config/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IEntity } from '../interfaces';

@Injectable()
export class DefaultConfigDataService<T extends IEntity> extends DefaultDataService<T> {
  constructor(entityName: string,
              @SkipSelf() protected http: HttpClient,
              protected httpUrlGenerator: HttpUrlGenerator,
              protected configService: ConfigService,
              config?: DefaultDataServiceConfig) {
    super(entityName, http, httpUrlGenerator, config);

  }

  add(entity: T): Observable<T> {
    this.setUrl(false);

    return super.add(entity).pipe(switchMap(() => this.getById(entity.id)));
  }

  delete(key: number | string): Observable<number | string> {
    this.setUrl(true);

    return super.delete(key).pipe(map(() => key));
  }

  getAll(): Observable<T[]> {
    this.setUrl(false);

    return super.getAll();
  }

  getById(key: number | string): Observable<T> {
    this.setUrl(true);

    return super.getById(key);
  }

  getWithQuery(queryParams: QueryParams | string): Observable<T[]> {
    this.setUrl(true);

    return super.getWithQuery(queryParams);
  }

  // Important! Only call if the backend service supports upserts as a POST to the target URL
  upsert(entity: T): Observable<T> {
    this.setUrl(true);

    const id = entity && (entity as any)?.id;
    const entityOrError = entity || new Error(`No "${this.entityName}" entity to upsert`);

    return this.execute('PUT', this.entityUrl + id, entityOrError).pipe(switchMap(() => this.getById(entity.id)));
  }

  private setUrl(addSlash: boolean): void {
    const apiUrl: string = this.configService.getSettings('communication.apiUrl');

    this.entityUrl = apiUrl + '/' + this.entityName;
    if (addSlash) {
      this.entityUrl = this.entityUrl + '/';
    }
    this.entitiesUrl = apiUrl + '/' + this.entityName;

  }
}
