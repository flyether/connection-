import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLConstants } from '../core/models/constants';


@Injectable({
  providedIn: 'root',
})
export class BaseURLInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let baseUrl: string = URLConstants.BASE_URL;
    if (request.url.includes('assets')) {
      baseUrl = "";
    }
    const apiReq = request.clone({ url: `${baseUrl}${request.url}` });
    return next.handle(apiReq);
  }
}
