import { createAction, props } from "@ngrx/store";


export namespace SharedStateActions {
   export const setLoadingShow = createAction('SET_LOADING_ACTION', props<{status: boolean}>());
   export const setError = createAction('SET_ERROR', props<{data: string}>());
   export const setModalOk = createAction('SET_MODALOK', props<{status: boolean, message: string}>());
}