import {
  routerReducer,
  RouterReducerState
} from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { RouterStateUrl } from './router.serializer';

export interface StateRouter {
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<StateRouter> = {
  router: routerReducer
};
