import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let language = navigator.language;
    let clone = req.clone({headers : req.headers.set('Accept-Language', language)});
    if(language){
      return next.handle(clone);
    }
    else{
      return next.handle(req);
    }
    
  }
}
