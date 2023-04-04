import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateParserService } from '../date-parser.service';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';
import { Order } from '../model/Order';
import { OrderHttpService } from '../order-http.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  displayedColumns = [];
  displayedColumnsMax = ['username', 'dateOfOrder', 'dateOfEvent', 'typeOfProduct', 'status', 'details' ];
  displayedColumnsMin = ['dateOfOrder', 'status', 'details'];
  orders : Array<Order>;

  constructor(private displayer: DisplayingComponentsSmoothlyService,
    private orderHttpService : OrderHttpService,
    private dateParserService : DateParserService,
    private router : Router) { }

  ngOnInit(): void {
    this.setColumnsInRegardToScreenSize();

    this.orderHttpService.getAllOrders().subscribe(list => {
      list.forEach(e => e.creationDate = this.dateParserService.parseFromIsoLocalDateTime(e.creationDate));
      this.orders = list
    });
    

 

    this.displayer.dipslayFromBottom("order-list-mat-card");
  }

  private setColumnsInRegardToScreenSize(){
    let screenSize = screen.width;
    if(screenSize <600){

      this.displayedColumns = this.displayedColumnsMin;
    }
    else {

      this.displayedColumns = this.displayedColumnsMax;
    }

  }
  @HostListener('window:resize', ['$event'])
  public handleScreenResize(){
    this.setColumnsInRegardToScreenSize();

  }
  public navigateToDetails(id : string){

    this.router.navigate(['orderDetails/' + id]);

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


