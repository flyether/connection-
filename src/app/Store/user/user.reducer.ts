import { Action, createReducer, on } from '@ngrx/store';

import { UserActions } from './user.action';
import { User } from '../../core/models/interface';

const initialState: User = {
  uid: '',
  email: '',
  name: '',
  token: '',
  profile: {
    uid: { S: '' },
    name: { S: '' },
    createdAt: { S: '' },
    email: { S: '' },
  },
};

const reducer = createReducer(
  initialState,
  on(UserActions.loginUserSuccess, (state, { data }) => ({
    ...state,
    token: data.token,
    uid: data.uid,
  })),
  on(UserActions.nameNewToStore, (state, { name }) => ({
    ...state,
    profile: {
      ...state.profile,
      name: { S: name },
    },
    name: name,
  })),
  on(UserActions.singUpUserSuccess, (state) => ({
    ...state,
  })),
  on(UserActions.profileSuccess, (state, { data }) => ({
    ...state,
    profile: data,
    name: data.name.S,
  })),
  on(UserActions.userDeleteSuccess, (state) => ({
    ...state,
    state: initialState,
  }))
);
export function userReducer(state: User | undefined, action: Action) {
  return reducer(state, action);
}
