import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { User } from '../core/models/interface';
import { userReducer } from './user/user.reducer';
import { GroupListInitialState, groupReducer } from './group/group.reducer';
import {
  InitPeopleConversations,
  peopleReducer,
} from './people/people.reducer';
import {
  SharedState,
  sharedStateReducer,
} from './shareState/shredStateReducer.reducer';
import { timerReducer, TimerState } from './timers/timer.reducer';

export interface AppState {
  group: GroupListInitialState;
  people: InitPeopleConversations;
  router: RouterReducerState;
  user: User;
  sharedState: SharedState;
  timer: TimerState;
}

export const appReducer = {
  group: groupReducer,
  people: peopleReducer,
  router: routerReducer,
  user: userReducer,
  sharedState: sharedStateReducer,
  timer: timerReducer,
};
