
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
  confVisibleDel = false;
  buttonMsgDel = 'Usuń';
  msgDel = 'Czy na pewno usunąć zamówienie?';
  confVisibleStat = false;
  buttonMsgStat = 'Zmień';
  msgStat = 'Czy na pewno zmienić status zamówienia?';
  statusChangeResponse;

  isViewDisplayedForAdmin : boolean = false;
  
  

  

  
  constructor(private orderService : OrderHttpService,
    private displayer : DisplayingComponentsSmoothlyService,
    private activatedRoute : ActivatedRoute,
    private parser: DateParserService) { }

  ngOnInit(): void {
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
    this.confVisibleStat = true;

  }

  public confirmStat(event){
    this.orderService.changeOrderStatus(this.order).subscribe((response : HttpResponse<string>) =>{
      this.statusChangeResponse = response.body.toString();
      let paragraph = document.getElementById('statusChangeResponseId');
      paragraph.style.display = 'block';
      this.confVisibleStat = false;
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
    this.confVisibleStat = false;
    

  }
  public confirmDel(event){


  }

  public cancelDel(event){


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

  

}
