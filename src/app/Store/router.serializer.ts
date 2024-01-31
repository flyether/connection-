import { Injectable } from '@angular/core';
import { Params, RouterStateSnapshot } from '@angular/router';
import {
  RouterStateSerializer,
  routerReducer,
  RouterReducerState
} from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

@Injectable()
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;

    return { url, params, queryParams };
  }
}
