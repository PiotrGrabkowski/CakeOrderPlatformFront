import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config } from './config/config';
import { LoginRequest } from './model/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {

  private isUserLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loginURL = Config.SERVERBASEURL + '/user/login';
  private userRole : BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private httpClient : HttpClient ) { }

  public login  (loginRequest: LoginRequest): Observable<HttpResponse<Object>>{

    return this.httpClient.post(this.loginURL, loginRequest, {observe : 'response', responseType : 'text'});
    
  }

  public getIsUserLoggedIn () : Observable<boolean>{

    return this.isUserLoggedIn.asObservable();
  }

  public setIsUserLoggedIn (flag : boolean){

    return this.isUserLoggedIn.next(flag);

  }
  public getUserRole() :Observable<string> {

    return this.userRole.asObservable();

  }

  public setUserRole(userRole: string) {

    return this.userRole.next(userRole);
  }



}
