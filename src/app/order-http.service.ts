import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Config } from './config/config';
import { LoginHttpService } from './login-http.service';
import { Order } from './model/Order';
import { OrderRequest } from './model/OrderRequest';

@Injectable({
  providedIn: 'root'
})
export class OrderHttpService {

  private getAllOrdersUrl : string = Config.SERVERBASEURL + '/orders/all';
  private getOrderByIdUrl : string = Config.SERVERBASEURL + '/orders/';
  private publicCreateOrderUrl : string = Config.SERVERBASEURL + '/orders/order';
  private authorizedCreateOrderUrl : string = Config.SERVERBASEURL + '/orders/order/authorized';
  private updateOrderStatusUrl : string = Config.SERVERBASEURL + '/orders/order/status';
  private deleteOrderUrl : string = Config.SERVERBASEURL + '/orders/';

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

public getAllOrders() : Observable<Array<Order>>{

  return this.httpClient.get<Array<Order>> (this.getAllOrdersUrl, {observe : 'body', responseType : 'json'});

}

public getOrderById(id : string): Observable<Order>{
  return this.httpClient.get<Order> (this.getOrderByIdUrl + id, {observe : 'body', responseType : 'json'});


}

public changeOrderStatus(order : Order): Observable<HttpResponse<Object>>{
  return this.httpClient.patch(this.updateOrderStatusUrl, order,  {observe : 'response', responseType : 'text'});

}

public deleteOrder(id: string): Observable<HttpResponse<Object>>{

  return this.httpClient.delete(this.deleteOrderUrl + id, {observe : 'response', responseType : 'text'});
}

}
