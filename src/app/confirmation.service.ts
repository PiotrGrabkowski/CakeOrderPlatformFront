import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from './config/config';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  

  
  private registerConfirmationUri = Config.SERVERBASEURL + '/user/registrationConfirmation/';
  private restorationConfirmationUri = Config.SERVERBASEURL + '/user/restorationConfirmation/';
  constructor(private httpClient : HttpClient) { }


  public confirmRegistration(token : string): Observable<HttpResponse<Object>>{

   return  this.httpClient.get(this.registerConfirmationUri + token,  {observe : 'response', responseType : 'text'});
  }
  public confirmRestoration(token : string): Observable<HttpResponse<Object>>{

    return  this.httpClient.get(this.restorationConfirmationUri + token,  {observe : 'response', responseType : 'text'});
   }
}
