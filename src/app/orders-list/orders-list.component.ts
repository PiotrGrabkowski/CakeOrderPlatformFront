import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DateParserService } from '../date-parser.service';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';
import { Order } from '../model/Order';
import { OrderFilterOptions } from '../model/OrderFilterOptions';
import { OrderFindRequestOptions } from '../model/OrderFindRequestOptions';
import { OrderSortingParametersDto } from '../model/OrderSortingParametersDto';
import { OrderStatus } from '../model/OrderStatus';
import { Page } from '../model/Page';
import { Sort } from '../model/Sort';
import { User } from '../model/User';
import { OrderHttpService } from '../order-http.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  user : string;

  displayedColumns = [];
  displayedColumnsMax = ['username', 'dateOfOrder', 'dateOfEvent', 'typeOfProduct', 'status', 'details' ];
  displayedColumnsMin = ['dateOfOrder', 'status', 'details'];
  orders : Array<Order>;

  sortingParameters : Array<OrderSortingParametersDto>;
  filterFormGroup : FormGroup;
  sortingFormGroup : FormGroup;

  isViewDisplayedForAdmin : boolean = false;

  isSpinnerDisplayed : boolean = false;
  spinnerMsg : string = 'Pobieranie zamówień...';
  orderStatus : OrderStatus = new OrderStatus();
  orderStatusOptions = [...this.orderStatus.options,  {
    name : "WYCZYŚC POLE",
    status :""

}];

currentPage : number = 1;
numberOfPages : number = 0;
itemsPerPage : number = 20;
nextPlaceholder : string = '';
previousPlaceholder : string = '';

orderFindRequestOptions : OrderFindRequestOptions = new OrderFindRequestOptions();

  

  constructor(private displayer: DisplayingComponentsSmoothlyService,
    private orderHttpService : OrderHttpService,
    private dateParserService : DateParserService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private userService : UserService) { }

  ngOnInit(): void {
    
    let sort : Sort = new Sort();
    let orderFilterOptions : OrderFilterOptions = new OrderFilterOptions();
    let page : Page<Order>  = new Page<Order>();
    page.currentPage = this.currentPage;
    page.itemsPerPage = this.itemsPerPage;
    sort.parameter = "O_CREATION_DATE";
    sort.sortingDirection = "DESC";
    this.orderFindRequestOptions.orderFilterOptions = orderFilterOptions;
    this.orderFindRequestOptions.page = page;
    this.orderFindRequestOptions.sort = sort;

    this.populateListOfOrders();
    this.populateSortingParameters();
 
    this.displayer.dipslayFromBottom("order-list-mat-card");
    this.createFormGroup();
    this.setNavigationPlaceholders();


    
  }

  private populateSortingParameters(){
    this.orderHttpService.getOrderSortingParameters().subscribe(list=>{
      this.sortingParameters = list;
    });
  }

  private populateListOfOrders(){
        /// to complete
        this.activatedRoute.paramMap.subscribe((params : Params) => {

          this.user =  params.get('user');
          if(this.user === 'admin'){
    
            this.isViewDisplayedForAdmin = true;
            this.getAllOrders(this.orderFindRequestOptions);
          }
          else{
    
            this.userService.getCurrentUser().subscribe(user =>{
              this.getOrdersForParticularUser(this.orderFindRequestOptions, user.id);
    
            });
            
            
    
    
          }
          this.setColumnsInRegardToScreenSize();
        
    
        });
        

  }
  private setNavigationPlaceholders(){
    if(this.currentPage < this.numberOfPages && this.numberOfPages >1){
      this.nextPlaceholder = 'Następna strona';
    }
    else{
      this.nextPlaceholder = '';
    }
    if(this.currentPage >1){
      this.previousPlaceholder = 'Poprzednia strona';
    }
    else{
      this.previousPlaceholder = '';
    }


  }
  next(){
    if(this.currentPage<this.numberOfPages){
      this.orderFindRequestOptions.page.currentPage = this.orderFindRequestOptions.page.currentPage + 1;
      this.currentPage = this.currentPage + 1;
      this.populateListOfOrders();
      this.setNavigationPlaceholders();
      
      }

  }
  

  
  previous(){
    if(this.currentPage>1){
      this.orderFindRequestOptions.page.currentPage = this.orderFindRequestOptions.page.currentPage - 1;
      this.currentPage = this.currentPage - 1;
      this.populateListOfOrders();
      this.setNavigationPlaceholders();
     

    }
   


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
    this.sortingFormGroup = new FormGroup({
     

      sortingParameter : new FormControl('O_CREATION_DATE'),
      sortingDirection : new FormControl('DESC')
    });

  }
 
  public cancelSorting(){
    this.sortingFormGroup.reset({
      sortingParameter : 'O_CREATION_DATE',
      sortingDirection : 'DESC'

    });
    this.getFiilteredAndSortedOrders();
  }

  public getFiilteredAndSortedOrders(){
    
    let orderFilterOptions : OrderFilterOptions = this.assignFormGroupToOrderFilterOptionsObject();
    let sort : Sort = this.assignFormGroupToSortObject();
    this.orderFindRequestOptions.orderFilterOptions = orderFilterOptions;
    this.orderFindRequestOptions.sort = sort;
    if(this.isViewDisplayedForAdmin){
      this.getAllOrders(this.orderFindRequestOptions);

    }
    else{
      this.userService.getCurrentUser().subscribe(user=>{
       this.getOrdersForParticularUser(this.orderFindRequestOptions, user.id);

      });


    }
 
  

  }
  private assignFormGroupToSortObject() : Sort{
    
    let sort : Sort = new Sort();
    sort.parameter = this.sortingFormGroup.get('sortingParameter').value;
    sort.sortingDirection = this.sortingFormGroup.get('sortingDirection').value;
    return sort;
  }

  private assignFormGroupToOrderFilterOptionsObject() : OrderFilterOptions{
    let orderFilterOptions : OrderFilterOptions = new OrderFilterOptions();
    orderFilterOptions.nickname = this.filterFormGroup.get('nickname').value;
    orderFilterOptions.username = this.filterFormGroup.get('username').value;
    if (this.filterFormGroup.get('fromEventDate').dirty){
      orderFilterOptions.fromEventDate = this.parseFromDateToLocalDateString(this.filterFormGroup.get('fromEventDate').value);
    }
    if (this.filterFormGroup.get('upToEventDate').dirty){
      orderFilterOptions.upToEventDate = this.parseFromDateToLocalDateString(this.filterFormGroup.get('upToEventDate').value);
    }
    if (this.filterFormGroup.get('fromCreationDate').dirty){
      orderFilterOptions.fromCreationDate = this.parseFromDateToLocalDateString(this.filterFormGroup.get('fromCreationDate').value);
    }
    if (this.filterFormGroup.get('upToCreationDate').dirty){
      orderFilterOptions.upToCreationDate = this.parseFromDateToLocalDateString(this.filterFormGroup.get('upToCreationDate').value);
    }
    
    
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
    this.getFiilteredAndSortedOrders();
   
    

  }

  private getAllOrders(orderFindRequestOptions : OrderFindRequestOptions){
    this.isSpinnerDisplayed = true;


    this.orderHttpService.getFilteredOrders(orderFindRequestOptions).subscribe(page => {
      this.numberOfPages = page.numberOfPages;
      let list = page.listOfItems;
      list.forEach(e => e.creationDate = this.dateParserService.parseFromIsoLocalDateTime(e.creationDate));
      this.orders = list;
      this.setNavigationPlaceholders();
      this.isSpinnerDisplayed = false;
      console.log('number of pages: ' + this.numberOfPages  + ', orderFindRequestOptions : ' + JSON.stringify(orderFindRequestOptions));
      console.log('returned page: '+ JSON.stringify(page));
      
    });

  }
  private getOrdersForParticularUser(orderFindRequestOptions : OrderFindRequestOptions, id : number){
    this.isSpinnerDisplayed = true;
    this.orderHttpService.getFilteredOrdersByUserId(orderFindRequestOptions, id).subscribe(page => {
      this.numberOfPages = page.numberOfPages;
      let list = page.listOfItems;
      list.forEach(e => e.creationDate = this.dateParserService.parseFromIsoLocalDateTime(e.creationDate));
      this.orders = list;
      this.setNavigationPlaceholders();
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


