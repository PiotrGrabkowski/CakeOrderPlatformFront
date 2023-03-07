import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from './config/config';
import { TasteControllerApi } from './config/TasteControllerApi';
import { Taste } from './model/Taste';

@Injectable({
  providedIn: 'root'
})
export class TasteHttpService {

  constructor(private httpClient : HttpClient ) { }

public getAll():Observable<Array<Taste>>{

  return this.httpClient.get<Array<Taste>>(Config.SERVERBASEURL + TasteControllerApi.BASE, {observe : 'body', responseType : 'json'});
}

public update(arrayOfTastes : Array<Taste>): Observable<HttpResponse<Object>>{

  return this.httpClient.post(Config.SERVERBASEURL + TasteControllerApi.BASE, arrayOfTastes, {observe : 'response', responseType : 'text'});
}




}
