import {
  Action,

  createReducer,
  on
} from '@ngrx/store';

import { SharedStateActions } from './shredState.action';

export interface SharedState {
  loading: boolean;
error: string; 
okModal:{
  status:boolean;
  message: string;}
}

const initialState: SharedState = {
  loading: false,
  error: '',
  okModal: {
    status:false,
    message: ''}
};
const reducer = createReducer(
  initialState,
  on(SharedStateActions.setLoadingShow, (state, action) => ({
    ...state,
    loading: action.status,
    error: action.status ? '' : state.error 
  })),
  on(SharedStateActions.setModalOk, (state, action) => ({
    ...state,
    okModal: action,
    loading: false,
    error: action.status ? '' : state.error 
  })),
  on(SharedStateActions.setError, (state, {data}) => ({
    ...state,
    error: data
  })),
);
export function sharedStateReducer(state: SharedState | undefined, action: Action) {
  return reducer(state, action);
}
