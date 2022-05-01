import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from './config/config';
import { RegisterRequest } from './model/RegisterRequest';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registryUri = Config.SERVERBASEURL + '/user/register';
  private confirmationUri = Config.SERVERBASEURL + '/user/confirm/';
  constructor(private httpClient : HttpClient) { }

  public registerUser(registerRequest: RegisterRequest): Observable<HttpResponse<Object>>{
    return this.httpClient.post(this.registryUri, registerRequest, {observe : 'response', responseType : 'text'});


  }
  public confirmRegistration(token : string): Observable<HttpResponse<Object>>{

   return  this.httpClient.patch(this.confirmationUri + token, null, {observe : 'response', responseType : 'text'});
  }
}
