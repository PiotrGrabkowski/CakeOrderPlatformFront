import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Config } from './config/config';

import { Order } from './model/Order';
import { OrderFilterOptions } from './model/OrderFilterOptions';
import { OrderFindRequestOptions } from './model/OrderFindRequestOptions';
import { OrderRequest } from './model/OrderRequest';
import { OrderSortingParametersDto } from './model/OrderSortingParametersDto';
import { Page } from './model/Page';

@Injectable({
  providedIn: 'root'
})
export class OrderHttpService {

  private getAllOrdersUrl : string = Config.SERVERBASEURL + '/orders/all';
  private getFilteredOrdersUrl : string = Config.SERVERBASEURL + '/orders/filtered';
  private getOrderByIdUrl : string = Config.SERVERBASEURL + '/orders/';
  private publicCreateOrderUrl : string = Config.SERVERBASEURL + '/orders/order';
  private authorizedCreateOrderUrl : string = Config.SERVERBASEURL + '/orders/order/authorized';
  private updateOrderStatusUrl : string = Config.SERVERBASEURL + '/orders/order/status';
  private deleteOrderUrl : string = Config.SERVERBASEURL + '/orders/';
  private getOrdersByUserIdUrl : string = Config.SERVERBASEURL + '/orders/all/';
  private getFilteredOrdersByUserIdUrl : string = Config.SERVERBASEURL + '/orders/filtered/user/';
  private getOrderSortingParametersUrl : string = Config.SERVERBASEURL + '/orders/order_sorting_parameters';

  constructor(private httpClient : HttpClient) { }

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
public getFilteredOrders(orderFindRequestOptions : OrderFindRequestOptions): Observable<Page<Order>>{

  return this.httpClient.post<Page<Order>> (this.getFilteredOrdersUrl, orderFindRequestOptions, {observe : 'body', responseType : 'json'});

}
public getFilteredOrdersByUserId(orderFindRequestOptions : OrderFindRequestOptions, id : number): Observable<Page<Order>>{

  return this.httpClient.post<Page<Order>> (this.getFilteredOrdersByUserIdUrl + id, orderFindRequestOptions, {observe : 'body', responseType : 'json'});

}

public getOrdersByUserId(id : number): Observable<Array<Order>>{

  return this.httpClient.get<Array<Order>> (this.getOrdersByUserIdUrl + id, {observe : 'body', responseType : 'json'});

}

public getOrderById(id : string): Observable<Order>{
  return this.httpClient.get<Order> (this.getOrderByIdUrl + id, {observe : 'body', responseType : 'json'});


}

public changeOrderStatus(order : Order): Observable<HttpResponse<Object>>{
  return this.httpClient.patch(this.updateOrderStatusUrl, order,  {observe : 'response', responseType : 'text'});

}

public deleteOrder(id: number): Observable<Object>{

  return this.httpClient.delete(this.deleteOrderUrl + id, {observe : 'body', responseType : 'text'});
}

public getOrderSortingParameters(): Observable<Array<OrderSortingParametersDto>>{

  return this.httpClient.get<Array<OrderSortingParametersDto>> (this.getOrderSortingParametersUrl, {observe : 'body', responseType : 'json'});

}

}
