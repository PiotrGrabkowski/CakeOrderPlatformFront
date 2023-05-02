import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DateParserService } from '../date-parser.service';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';
import { Order } from '../model/Order';
import { OrderFilterOptions } from '../model/OrderFilterOptions';
import { OrderStatus } from '../model/OrderStatus';
import { OrderHttpService } from '../order-http.service';
import { UserService } from '../user.service';

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
  filterFormGroup : FormGroup;

  isViewDisplayedForAdmin : boolean = false;

  isSpinnerDisplayed : boolean = false;
  spinnerMsg : string = 'Pobieranie zamówień...';
  orderStatus : OrderStatus = new OrderStatus();
  orderStatusOptions = [...this.orderStatus.options,  {
    name : "WYCZYŚC POLE",
    status :""

}];

  

  constructor(private displayer: DisplayingComponentsSmoothlyService,
    private orderHttpService : OrderHttpService,
    private dateParserService : DateParserService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private userService : UserService) { }

  ngOnInit(): void {
    
    
    
 
    this.displayer.dipslayFromBottom("order-list-mat-card");
    this.createFormGroup();

    /// to complete
    this.activatedRoute.paramMap.subscribe((params : Params) => {

      let user =  params.get('user');
      if(user === 'admin'){

        this.isViewDisplayedForAdmin = true;
        this.getAllOrders();
      }
      else{

        this.userService.getCurrentUser().subscribe(user =>{
          this.getOrdersForParticularUser(user.id);

        });
        


      }
      this.setColumnsInRegardToScreenSize();
    

    });
  }

  private createFormGroup (){
    this.filterFormGroup = new FormGroup({

      nickname : new FormControl(''),
      username : new FormControl(''), // must be an email
      fromEventDate : new FormControl(''),
      upToEventDate: new FormControl(''),
      fromCreationDate : new FormControl(''),
      upToCreationDate : new FormControl(''),
      orderStatus : new FormControl(''),
      description: new FormControl(''),
      phoneNumber : new FormControl(''),
      typeOfProduct : new FormControl('')
      
    });

  }

  public filter(){
    this.isSpinnerDisplayed = true;
    let orderFilterOptions : OrderFilterOptions = this.assignFormGroupToOrderFilterOptionsObject();
    this.orderHttpService.getFilteredOrders(orderFilterOptions).subscribe(
      list => {
        this.orders = list;
        this.isSpinnerDisplayed = false;

      }
    );
  

  }

  public assignFormGroupToOrderFilterOptionsObject() : OrderFilterOptions{
    let orderFilterOptions : OrderFilterOptions = new OrderFilterOptions();
    orderFilterOptions.nickname = this.filterFormGroup.get('nickname').value;
    orderFilterOptions.username = this.filterFormGroup.get('username').value;
    if (this.filterFormGroup.get('fromEventDate').dirty){
      orderFilterOptions.fromEventDate = this.parseFromDateToLocalDateString(this.filterFormGroup.get('fromEventDate').value);
    }
    if (this.filterFormGroup.get('upToEventDate').dirty){
      orderFilterOptions.upToEventDate = this.parseFromDateToLocalDateString(this.filterFormGroup.get('upToEventDate').value);
    }
    orderFilterOptions.fromCreationDate = this.filterFormGroup.get('fromCreationDate').value;
    orderFilterOptions.upToCreationDate = this.filterFormGroup.get('upToCreationDate').value;
    orderFilterOptions.orderStatus = this.filterFormGroup.get('orderStatus').value;
    orderFilterOptions.description = this.filterFormGroup.get('description').value;
    orderFilterOptions.phoneNumber = this.filterFormGroup.get('phoneNumber').value;
    orderFilterOptions.typeOfProduct = this.filterFormGroup.get('typeOfProduct').value;

    return orderFilterOptions;

  }
  private parseFromDateToLocalDateString(date : Date): string{
    

     // return date.toISOString().split("T")[0];
     let year = date.getFullYear();
     let month = (date.getMonth()+1) + '';
     if(month.length <2){

      month = '0' + month;
     }
     let day = date.getDate() + '';
     if(day.length <2){

      day = '0' + day;
     }
     

     return year + '-' + month + '-' + day;
      
   
    
  }
 
  public cancelFilter(){
    this.filterFormGroup.reset({
      nickname : '',
      username : '',
      fromEventDate : '',
      upToEventDate: '',
      fromCreationDate : '',
      upToCreationDate : '',
      orderStatus : '',
      description: '',
      phoneNumber : '',
      typeOfProduct : ''

    });
    this.getAllOrders();

  }

  private getAllOrders(){
    this.isSpinnerDisplayed = true;
    this.orderHttpService.getAllOrders().subscribe(list => {
      list.forEach(e => e.creationDate = this.dateParserService.parseFromIsoLocalDateTime(e.creationDate));
      this.orders = list;
      this.isSpinnerDisplayed = false;
    });

  }
  private getOrdersForParticularUser(id : number){
    this.isSpinnerDisplayed = true;
    this.orderHttpService.getOrdersByUserId(id).subscribe(list => {
      list.forEach(e => e.creationDate = this.dateParserService.parseFromIsoLocalDateTime(e.creationDate));
      this.orders = list;
      this.isSpinnerDisplayed = false;
    });

  }

  private setColumnsInRegardToScreenSize(){
    let screenSize = screen.width;
    if(screenSize <600){

      this.displayedColumns = this.displayedColumnsMin;
    }
    else {

      this.displayedColumns = this.displayedColumnsMax;
      if(!this.isViewDisplayedForAdmin){
        this.displayedColumns = this.displayedColumnsMax.filter((value : string)=>{
          return value!== 'username';
        });
      }
    }

  }
  @HostListener('window:resize', ['$event'])
  public handleScreenResize(){
    this.setColumnsInRegardToScreenSize();

  }
  public navigateToDetails(id : string){
    let user;
    if(this.isViewDisplayedForAdmin === true){

      user = 'admin';
    }
    else{

      user = 'user';
    }
    this.router.navigate(['orderDetails/', id, user]);

  }

  public checkStatus (order: Order): string{

    if(order.orderStatus == 'NEW'){
      return 'yellow';
    }
    if(order.orderStatus == 'COMPLETED'){
      return 'green';
    }
    if(order.orderStatus == 'PROCESSED'){
      return 'grey';
    }

  }

}


