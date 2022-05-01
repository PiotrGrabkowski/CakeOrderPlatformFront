import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let jwt = localStorage.getItem('jwt');
    if(jwt){
    let clone = req.clone({headers : req.headers.set('Authorization', jwt)});
    return next.handle(clone);

    }
    else{
    return next.handle(req);
    }
    
  }
}
