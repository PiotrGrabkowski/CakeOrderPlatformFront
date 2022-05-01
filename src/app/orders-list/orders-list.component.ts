import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  displayedColumns = ['username', 'dateOfOrder', 'dateOfEvent', 'typeOfProduct', 'status', 'details','buttons' ];
  orders : Array<Order>;

  constructor() { }








  ngOnInit(): void {

    this.orders = [
      {id :1, username : 'Paweł', dateOfOrder: '2021-07-03', dateOfEvent: '2021-07-25', typeOfProduct: 'tort', status : 'Nowe'},
      {id :2, username : 'Piotr', dateOfOrder: '2021-07-03', dateOfEvent: '2021-07-25', typeOfProduct: 'bezy', status : 'Zrealizowane'},
      {id :3, username : 'Kazimiera', dateOfOrder: '2021-07-03', dateOfEvent: '2021-07-25', typeOfProduct: 'tort', status : 'W trakcie realizacji'}

    ];
  }

  public checkStatus (order: Order): string{

    if(order.status == 'Nowe'){
      return 'yellow';
    }
    if(order.status == 'Zrealizowane'){
      return 'green';
    }
    if(order.status == 'W trakcie realizacji'){
      return 'grey';
    }

  }

}

export interface Order {
id: number;
username: string;
dateOfOrder: string;
dateOfEvent: string;
typeOfProduct: string;
status: string;

}
