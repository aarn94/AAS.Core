import { NavigationExtras } from '@angular/router';

import { IProps } from '../../state/interfaces';

export interface IGo extends IProps<string[]> {
  extras?: NavigationExtras;
}

export interface INavigationProps<T> {
  type: string;
  payload: T;
}
