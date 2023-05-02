import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { LoginHttpService } from './login-http.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private router : Router, private loginHttpService : LoginHttpService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(

      (error) => {

        if (error instanceof HttpErrorResponse){

          if (error.error instanceof ErrorEvent){
            return throwError(error.error);
          }
          else{

           
            let status = error.status;
            let msg = error.error;
            
            
            if(status ==401){

              localStorage.removeItem('jwt');
              this.loginHttpService.setIsUserLoggedIn(false);
             
              this.router.navigate(['login', {errorMsg : msg}]);


            }
            if(status ==500){

              
             
              this.router.navigate(['responseView', 'Wystąpił problem tehcniczny. Prosimy spróbować ponownie, bądż skontaktować się z nami pod numerem telefonu podanym w zakładce kontakt.']);


            }
         



          }
        }

        else {

          return throwError(error);
        }
      }


    ));







  }
  
}
