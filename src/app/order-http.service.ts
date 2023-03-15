import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Config } from './config/config';
import { LoginHttpService } from './login-http.service';
import { OrderRequest } from './model/OrderRequest';

@Injectable({
  providedIn: 'root'
})
export class OrderHttpService {

  publicCreateOrderUrl : string = Config.SERVERBASEURL + '/orders/order';
  authorizedCreateOrderUrl : string = Config.SERVERBASEURL + '/orders/order/authorized';

  constructor(private httpClient : HttpClient, private loginHttpService : LoginHttpService) { }

public createOrder(orderRequest : OrderRequest, isUserLoggedIn : boolean): Observable<HttpResponse<Object>>{
 
      if(isUserLoggedIn){

        return this.makeCreateOrderRequest(orderRequest, this.authorizedCreateOrderUrl);
      }
      else{
  
        return this.makeCreateOrderRequest(orderRequest, this.publicCreateOrderUrl);
      }
  
}

private makeCreateOrderRequest(orderRequest : OrderRequest,  url : string): Observable<HttpResponse<Object>>{
 
 
  return this.httpClient.post(url,orderRequest, {observe : 'response', responseType : 'text'});


}

}
