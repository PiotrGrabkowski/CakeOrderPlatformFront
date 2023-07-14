
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmationComponentConfig } from '../confirmation/confirmation.component';
import { DateParserService } from '../date-parser.service';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';
import { Order } from '../model/Order';
import { OrderHttpService } from '../order-http.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order : Order;
  creationDate : string;
  statusStyle : string;

  isSpinnerDisplayed : boolean = false;
  msg = 'Ususwanie zamówienia...';

  

  statusChangeConfirmConfig : ConfirmationComponentConfig = new ConfirmationComponentConfig();
  deleteConfirmConfig : ConfirmationComponentConfig = new ConfirmationComponentConfig();
  
  
  statusChangeResponse;

  isViewDisplayedForAdmin : boolean = false;
  
  

  

  
  constructor(private router : Router, private orderService : OrderHttpService,
    private displayer : DisplayingComponentsSmoothlyService,
    private activatedRoute : ActivatedRoute,
    private parser: DateParserService) { }

  ngOnInit(): void {
    this.statusChangeConfirmConfig.visible = false;
    this.statusChangeConfirmConfig.buttonMsg = 'Zmień';
    this.statusChangeConfirmConfig.msg = 'Czy na pewno zmienić status zamówienia?';

    this.deleteConfirmConfig.visible = false;
    this.deleteConfirmConfig.buttonMsg = 'Usuń';
    this.deleteConfirmConfig.msg = 'Czy na pewno usunąć zamówienie?';



  
 
    this.displayer.dipslayFromBottom('my-mat-card');
    
    this.activatedRoute.paramMap.pipe(switchMap((params : Params)=> {
      let user = params.get('user');
      if(user === 'admin'){
        this.isViewDisplayedForAdmin = true;
      }
      return this.orderService.getOrderById(params.get('id'));

    })).subscribe(element => {this.order = element; 
      this.creationDate = this.parser.parseFromIsoLocalDateTime(element.creationDate);
      this.setStatusStyle(element);

  });

  }
  public updateStat(stat : string){
    this.order.orderStatus = stat;
    this.statusChangeConfirmConfig.visible = true;

  }

  public confirmStat(event){
    this.orderService.changeOrderStatus(this.order).subscribe((response : HttpResponse<string>) =>{
      this.statusChangeResponse = response.body.toString();
      let paragraph = document.getElementById('statusChangeResponseId');
      paragraph.style.display = 'block';
      this.statusChangeConfirmConfig.visible = false;
      if(response.status === 200 ){
        this.setStatusStyle(this.order);

      }
      function hideStatusChangeResponse(){
        paragraph.style.display = 'none';
       

      }
      setTimeout(hideStatusChangeResponse, 3000);
     
      
    })

      
       

  }


  public cancelStat(event){
    
    this.statusChangeConfirmConfig.visible = false;
    

  }
  public deleteOrder(){
    this.deleteConfirmConfig.visible = true;
    
  }
  public confirmDel(event){
    
    this.isSpinnerDisplayed = true;
    this.orderService.deleteOrder(this.order.id).subscribe(response =>{
      
      this.router.navigate(['responseView/' + response]);
      this.isSpinnerDisplayed = false;

    });


  }

  public cancelDel(event){
    this.deleteConfirmConfig.visible = false;


  }

  private setStatusStyle(element : Order){
    if(element.orderStatus === 'NEW'){
      this.statusStyle = 'yellow';

    }
    if(element.orderStatus==='PROCESSED'){
      this.statusStyle = 'grey';

    }
    if(element.orderStatus ==='COMPLETED'){
      this.statusStyle =  'green';

    }


  }
  public getImageSrc(){
    if(this.order.image !== null){
      return this.order.image.url;
    }
    else{
      return null;
    }
  }

  

}
