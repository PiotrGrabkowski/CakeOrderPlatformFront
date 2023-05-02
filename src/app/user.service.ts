import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config } from './config/config';
import { LoginRequest } from './model/LoginRequest';
import { LoginResponse } from './model/LoginResponse';
import { PasswordChangeRequest } from './model/PasswordChangeRequest';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private isUserLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loginURL = Config.SERVERBASEURL + '/user/login';
  private restorePasswordUrl = Config.SERVERBASEURL + '/user/passwordRestoration';
  private passwordChangeUrl : string = Config.SERVERBASEURL + '/user/passwordChange';
  private userRole : BehaviorSubject<string> = new BehaviorSubject<string>('');
  private currentUser : BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private httpClient : HttpClient ) { }

  public login  (loginRequest: LoginRequest): Observable<HttpResponse<LoginResponse>>{

    return this.httpClient.post<LoginResponse>(this.loginURL, loginRequest, {observe : 'response', responseType : 'json'});
    
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
  
  public getCurrentUser() :Observable<User> {

    return this.currentUser.asObservable();

  }

  public setCurrentUser(user: User) {

    return this.currentUser.next(user);
  }


  
  
  public changePassword(passwordChangeRequest: PasswordChangeRequest): Observable<Object>{
    return this.httpClient.post(this.passwordChangeUrl, passwordChangeRequest, {observe : 'body', responseType : 'text'});


  }
  public restorePassword(user : User): Observable<Object>{

    return this.httpClient.post(this.restorePasswordUrl, user, {observe : 'body', responseType : 'text'});
    
  }
}
