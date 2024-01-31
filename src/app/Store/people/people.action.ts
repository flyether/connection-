import { createAction, props } from "@ngrx/store";
import {  PeopleList } from "src/app/core/models/interface";

export namespace PeopleActions {
   export const peopleStart = createAction('GET_PEOPLE');
   export const peopleSuccess = createAction('GET_PEOPLE_SUCCESS', props<{data: PeopleList }>());
  
}