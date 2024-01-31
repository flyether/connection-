import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let token = localStorage.getItem('fakeToken');
      let email = localStorage.getItem('email');
      let uid = localStorage.getItem('uid');
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            'rs-email': email || '',
            'rs-uid': uid || ''
          }
        });
      }

      return next.handle(request);
  }
}
