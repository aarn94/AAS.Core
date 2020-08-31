import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { ConfigService } from '@ngx-config/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DefaultConfigDataService<T> extends DefaultDataService<T> {
  constructor(entityName: string,
              protected http: HttpClient,
              protected httpUrlGenerator: HttpUrlGenerator,
              protected configService: ConfigService,
              config?: DefaultDataServiceConfig) {
      super(entityName, http, httpUrlGenerator, config);

    }

  add(entity: T): Observable<T> {
    this.setUrl();
    return super.add(entity).pipe(map(() => entity));
  }

  delete(key: number | string): Observable<number | string> {
    this.setUrl();
    return super.delete(key).pipe(map(() => key));
  }

  getAll(): Observable<T[]> {
    this.setUrl();
    return super.getAll();
  }

  getById(key: number | string): Observable<T> {
    this.setUrl();
    return super.getById(key);
  }

  getWithQuery(queryParams: QueryParams | string): Observable<T[]> {
    this.setUrl();
    return super.getWithQuery(queryParams);
  }

  // Important! Only call if the backend service supports upserts as a POST to the target URL
  upsert(entity: T): Observable<T> {
    this.setUrl();
    const id = entity && (entity as any)?.id;
    const entityOrError = entity || new Error(`No "${this.entityName}" entity to upsert`);

    return this.execute('PUT', this.entityUrl + id, entityOrError).pipe(map(() => entity));
  }

  private setUrl(): void {
    const apiUrl: string = this.configService.getSettings('communication.apiUrl');

    this.entityUrl = apiUrl + '/' + this.entityName + '/';
    this.entitiesUrl = apiUrl + '/' + this.entityName;

  }
}