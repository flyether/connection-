import { createAction, props } from "@ngrx/store";
import { GroupName, GroupCreateReq, GroupList, newGroupData, GroupID, GroupDialogs, GroupMessage } from "src/app/core/models/interface";


export namespace GroupActions {
   export const groupStart = createAction('GET_GROUP');
   export const groupSuccess = createAction('GET_GROUP_SUCCESS', props<{data: GroupList }>());
   export const groupDialogStart = createAction('GET_GROUP_DIALOG', props<{data: GroupID, since?: string }>());
   export const groupDialogSuccess = createAction('GET_GROUP_DIALOG_SUCCESS', props<{data: GroupDialogs, id?:string, redirect: boolean  }>());

   export const groupDialogSinceStart = createAction('GET_GROUP_DIALOG_SINCE', props<{data: GroupID, since?: string }>());
   export const groupDialogSinceSuccess = createAction('GET_GROUP_DIALOG_SINCE_SUCCESS', props<{data: GroupDialogs, id?:string, redirect: boolean  }>());

   export const groupCreateStart = createAction('POST_GROUP', props<{data: GroupName }>());
   export const groupCreateMessage = createAction('POST_GROUP_MESSAGE', props<{data: GroupMessage }>());
   export const groupCreateSuccess = createAction('POST_GROUP_SUCCESS', props<{data: GroupCreateReq }>());

   export const groupCreateNewToStore= createAction('NEW_GROUP_STORE', props<{data: newGroupData }>());
   export const groupSince= createAction('GROUP_SINCE', props<{data: string }>());


   export const groupDelete = createAction('DELETE_GROUP', props<{data: GroupID, redirect: boolean  }>());

   
   // export const getUser = createAction('GET_USER');
   // export const getUserSuccess = createAction('GET_USER_SUCCESS', props<{data: User}>());
   // export const patchUser = createAction('PATCH_USER', props<{data: MapFormData}>());
   // export const patchUserSuccess = createAction('PATCH_USER_SUCCESS', props<{data: User}>());
}