/* eslint-disable  @typescript-eslint/no-shadow */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';

import { URLConstants } from '../../core/models/constants';
import { Companion, ConversationID, ConversationMessage, ConversationsList, GroupDialogs,  PeopleList } from 'src/app/core/models/interface';

@Injectable({
  providedIn: 'root',
})
export class PeopleConversationsService {
  constructor(private http: HttpClient) {}

  getPeopleList(): Observable<PeopleList> {
    return this.http.get<PeopleList>(URLConstants.API_USERS);
  }

  getConversationsList(): Observable<ConversationsList> {
    return this.http.get<ConversationsList>(URLConstants.API_CONVERSATIONS_LIST);
  }


  getConversationPerson(body: ConversationID, since?: string): Observable<GroupDialogs> {
    let params = new HttpParams()
    .set('conversationID', body.conversationID)
    if(since)  params = params.set('since', since)
    const options = { params };
    return this.http.get<GroupDialogs>(URLConstants.API_CONVERSATION_PERSON_READ, options);
  }

  postConversationPersonCreate(body:Companion): Observable<ConversationID> {
    return this.http.post<ConversationID>(URLConstants.API_CONVERSATION_CREATE, body);
  }
  postConversationPersonMessage(body:ConversationMessage){
    return this.http.post(URLConstants. API_CONVERSATION_MESSAGE, body);
  }

  DeleteConversation(body: ConversationID ) {
    let params = new HttpParams().set('conversationID', body.conversationID);
    const options = { params };
    return this.http.delete(URLConstants.API_DELETE_CONVERSATION, options);
  }
}
