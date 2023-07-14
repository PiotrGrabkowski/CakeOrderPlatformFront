import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config } from './config/config';
import { LoginRequest } from './model/LoginRequest';
import { LoginResponse } from './model/LoginResponse';
import { Page } from './model/Page';
import { PasswordChangeRequest } from './model/PasswordChangeRequest';
import { User } from './model/User';
import { UserFindRequestOptions } from './model/UserFindRequestOptions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private isUserLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loginURL = Config.SERVERBASEURL + '/user/login';
  private restorePasswordUrl = Config.SERVERBASEURL + '/user/passwordRestoration';
  private passwordChangeUrl : string = Config.SERVERBASEURL + '/user/passwordChange';
  private checkIfExistsUrl : string = Config.SERVERBASEURL + '/user/presence/';
  private updateUserUrl : string = Config.SERVERBASEURL + '/user';
  private getAllUsersUrl : string = Config.SERVERBASEURL + '/user/all';
  private getUserByIdUrl : string = Config.SERVERBASEURL + '/user/';
  private deleteUserByIdUrl : string = Config.SERVERBASEURL + '/user/';
  private updateUserStatusUrl : string = Config.SERVERBASEURL + '/user/id/status';


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

  public checkIfUserAlreadyExists(username : string): Observable<boolean>{

    return this.httpClient.get<boolean>(this.checkIfExistsUrl + username,{observe : 'body'} );
  }

  
  
  public changePassword(passwordChangeRequest: PasswordChangeRequest): Observable<Object>{
    return this.httpClient.post(this.passwordChangeUrl, passwordChangeRequest, {observe : 'body', responseType : 'text'});


  }
  public restorePassword(user : User): Observable<Object>{

    return this.httpClient.post(this.restorePasswordUrl, user, {observe : 'body', responseType : 'text'});
    
  }
  public updateUser (user : User) : Observable<Object>{

    return this.httpClient.patch(this.updateUserUrl ,user,{observe : 'body', responseType : 'text'});
  }
  


  public getAllUsers(userFindRequestOptions : UserFindRequestOptions): Observable<Page<User>>{

    return this.httpClient.post<Page<User>> (this.getAllUsersUrl, userFindRequestOptions, {observe : 'body', responseType : 'json'});
  
  }
  public getUserById(id: number) : Observable<User>{
    return this.httpClient.get<User>(this.getUserByIdUrl + id, {observe : 'body', responseType : 'json'});
  }
  public deleteUserById(id: number): Observable<Object>{
    return this.httpClient.delete(this.deleteUserByIdUrl + id, {observe : 'body', responseType : 'text'});
  }
  public updateUserStatus(id : number, active : boolean): Observable<Object>{
    let url : string = this.updateUserStatusUrl.replace('id', String(id));
    let activeString;
    if(active){
      activeString = 'true';
    }
    else{
      activeString = 'false';
    }
    
    
    
    let params : HttpParams = new HttpParams().set('active', activeString);
   
    console.log('active: ' + params.get('active'));
    return this.httpClient.patch(url,null,{observe : 'body', responseType : 'text', params : params});

  }
}
