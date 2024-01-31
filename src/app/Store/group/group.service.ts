/* eslint-disable  @typescript-eslint/no-shadow */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URLConstants } from '../../core/models/constants';
import {
  GroupName,
  GroupCreateReq,
  GroupList,
  GroupID,
  GroupDialogs,
  GroupMessage,
} from 'src/app/core/models/interface';

@Injectable({
  providedIn: 'root',
})
export class GropeService {
  constructor(private http: HttpClient) {}

  getGropeList(): Observable<GroupList> {
    return this.http.get<GroupList>(URLConstants.API_GROUP);
  }
  getGropeDialogs(body: GroupID, since?: string): Observable<GroupDialogs> {
    let params = new HttpParams().set('groupID', body.groupID);
    if (since) params = params.set('since', since);
    const options = { params };
    return this.http.get<GroupDialogs>(
      URLConstants.API_GROUP_DIALOG_READ,
      options
    );
  }
  postGropeCreate(body: GroupName): Observable<GroupCreateReq> {
    return this.http.post<GroupCreateReq>(URLConstants.API_CREATE_GROUP, body);
  }
  postGropeMessage(body: GroupMessage) {
    return this.http.post(URLConstants.API_MESSAGE_GROUP, body);
  }

  DeleteGrope(body: GroupID) {
    let params = new HttpParams().set('groupID', body.groupID);
    const options = { params };
    return this.http.delete(URLConstants.API_DELETE_GROUP, options);
  }
}
