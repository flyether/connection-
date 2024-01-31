export enum URLConstants {
   SEARCH_URL = 'search',
   STATISTIC_URL = 'videos',
   BASE_URL = 'https://tasks.app.rs.school/angular/',
   LOGIN = 'login',
   SINGUP = 'signup',
   TODO = 'todo',
   GROUP = 'group',
   CONVERSATION = 'conversation',
   PROFILE = 'profile',
   API_REG='registration',
   API_LOGIN='login',
   API_GROUP='groups/list',
   API_GROUP_DIALOG_READ='groups/read',
   API_CONVERSATION_PERSON_READ='conversations/read',
   API_CONVERSATION_CREATE='conversations/create',
   API_CONVERSATION_MESSAGE='conversations/append',
   API_CREATE_GROUP='groups/create',
   API_DELETE_GROUP='groups/delete',
   API_DELETE_CONVERSATION='conversations/delete',
   API_MESSAGE_GROUP='groups/append',
   API_USERS='users',
   API_CONVERSATIONS_LIST='conversations/list',
   API_DELETE_USER ='logout'
 }
 
 export interface QueryParam {
   pageToken?: string;
   pageInfo?: number;
   prevPageToken?: string;
   searchQuestion?: string;
   newVideoLength?: number;
   pageNumber?: number;
 }