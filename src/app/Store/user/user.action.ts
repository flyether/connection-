import { createAction, props } from '@ngrx/store';
import { RegData } from '../../components/form-auth/models/login.model';
import { Profile, User, loginResponse } from '../../core/models/interface';

export namespace UserActions {
  export const loginUserStart = createAction(
    'POST_LOGIN_USER',
    props<{ data: RegData }>()
  );
  export const loginUserSuccess = createAction(
    'POST_LOGIN_USER_SUCCESS',
    props<{ data: loginResponse; redirect: boolean }>()
  );
  export const singUpUserStart = createAction(
    'POST_SIGNUP_USER',
    props<{ data: RegData }>()
  );
  export const singUpUserSuccess = createAction(
    'POST_SIGNUP_USER_SUCCESS',
    props<{ redirect: boolean }>()
  );
  export const profileStart = createAction('GET_PROFILE');
  export const profileSuccess = createAction(
    'GET_PROFILE_SUCCESS',
    props<{ data: Profile }>()
  );

  export const namePut = createAction(
    'PUT_NAME_USER',
    props<{ data: { name: string } }>()
  );
  export const nameNewToStore = createAction(
    'NEW_NAME_STORE',
    props<{ name: string }>()
  );

  export const userDelete = createAction('DELETE_USER');
  export const userDeleteSuccess = createAction(
    'DELETE_USER',
    props<{ redirect: boolean }>()
  );
  // export const getUser = createAction('GET_USER');
  // export const getUserSuccess = createAction('GET_USER_SUCCESS', props<{data: User}>());
  // export const patchUser = createAction('PATCH_USER', props<{data: MapFormData}>());
  // export const patchUserSuccess = createAction('PATCH_USER_SUCCESS', props<{data: User}>());
}
