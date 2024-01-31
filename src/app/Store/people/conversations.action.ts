import { createAction, props } from "@ngrx/store";
import {  Companion, ConversationID, ConversationMessage, ConversationsList, GroupDialogItems, GroupDialogs } from "src/app/core/models/interface";



export namespace ConversationsActions {
   export const conversationsStart = createAction('GET_CONVERSATIONS');
   export const conversationsSuccess = createAction('GET_CONVERSATIONS_SUCCESS', props<{data: ConversationsList }>());



   export const conversationSince= createAction('CONVERSATIONS_SINCE', props<{data: string }>());

   export const personConversationStart = createAction('GET_CONVERSATION_PERSON', props<{data: ConversationID , since?: string }>());
   export const personConversationSuccess = createAction('GET_CONVERSATION_PERSON_SUCCESS', props<{data: GroupDialogs, id?:string, redirect: boolean  }>());

   export const personConversationSinceStart = createAction('GET_CONVERSATION_PERSON_SINCE', props<{data: ConversationID , since?: string }>());
   export const personConversationSinceSuccess = createAction('GET_CONVERSATION_PERSON_SINCE_SUCCESS', props<{data: GroupDialogs, id?:string, redirect: boolean  }>());



   export const conversationCreateSuccess = createAction('POST_CONVERSATION_SUCCESS', props<{data: ConversationID , redirect: boolean , id?:string,}>());
   export const conversationDelete = createAction('DELETE_CONVERSATION', props<{data: ConversationID}>());
   export const conversationDeleteSuccess = createAction('DELETE_CONVERSATION_SUCCESS', props<{data: ConversationID, redirect: boolean }>());
   export const conversationCreateNewToStore= createAction('NEW_CONVERSATION_STORE', props<{data: GroupDialogItems }>());

 export const conversationCreateStart = createAction('POST_CONVERSATION', props<{data: Companion}>());
 export const conversationCreateMessage = createAction('POST_CONVERSATION_MESSAGE', props<{data: ConversationMessage }>());
}