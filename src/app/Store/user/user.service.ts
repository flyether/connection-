import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { EMPTY, Observable, catchError, of } from 'rxjs';
import { RegData } from 'src/app/components/form-auth/models/login.model';
import { Profile, User, loginResponse } from 'src/app/core/models/interface';
import { AppState } from '../app.state';
import { URLConstants } from 'src/app/core/models/constants';



@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient, private store$: Store<AppState>) {}

  signUp(body: RegData): Observable<string> {
    return this.http.post<string>(
      `${URLConstants.API_REG}`,
      body
    );
  }
  login(body: RegData): Observable<loginResponse> {
    return this.http.post<loginResponse>(
      URLConstants.API_LOGIN,
      body
    );
  }
  getUser(): Observable<Profile> {
    return this.http.get<Profile> (URLConstants.PROFILE );
  }
  putName(data: {name:string}) {
    return this.http.put(URLConstants.PROFILE, data );
  }
  DeleteUser(){
    return this.http.delete(URLConstants.API_DELETE_USER );
  }


}

