import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from './config/config';
import { SmsSettings } from './model/SmsSettings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settingsUrl : string = Config.SERVERBASEURL + '/settings';
  constructor(private httpClient : HttpClient) { }

  public getSettings() : Observable<SmsSettings>{

    return this.httpClient.get<SmsSettings> (this.settingsUrl, {observe : 'body', responseType : 'json'});
  
  }
  public setSettings(smsSettings: SmsSettings) : Observable<Object>{

    return this.httpClient.post(this.settingsUrl, smsSettings, {observe : 'body', responseType : 'text'});
  }
}
