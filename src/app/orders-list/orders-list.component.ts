import { Component, OnInit } from '@angular/core';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';
import { Order } from '../model/Order';
import { OrderHttpService } from '../order-http.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  displayedColumns = ['username', 'dateOfOrder', 'dateOfEvent', 'typeOfProduct', 'status', 'details','buttons' ];
  orders : Array<Order>;

  constructor(private displayer: DisplayingComponentsSmoothlyService, private orderHttpService : OrderHttpService) { }

  ngOnInit(): void {

    this.orderHttpService.getAllOrders().subscribe(list => this.orders = list);

    //todo: fetch data from a server
   // this.orders = [
     // {id :1, username : 'Paweł', dateOfOrder: '2021-07-03', dateOfEvent: '2021-07-25', typeOfProduct: 'tort', status : 'Nowe'},
     // {id :2, username : 'Piotr', dateOfOrder: '2021-07-03', dateOfEvent: '2021-07-25', typeOfProduct: 'bezy', status : 'Zrealizowane'},
     // {id :3, username : 'Kazimiera', dateOfOrder: '2021-07-03', dateOfEvent: '2021-07-25', typeOfProduct: 'tort', status : 'W trakcie realizacji'}

   // ];

    this.displayer.dipslayFromBottom("order-list-mat-card");
  }

  public checkStatus (order: Order): string{

    if(order.orderStatus == 'Nowe'){
      return 'yellow';
    }
    if(order.orderStatus == 'Zrealizowane'){
      return 'green';
    }
    if(order.orderStatus == 'W trakcie realizacji'){
      return 'grey';
    }

  }

}


