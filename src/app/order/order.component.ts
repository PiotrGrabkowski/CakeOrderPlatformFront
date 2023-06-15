import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateParserService } from '../date-parser.service';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';
import { LoginHttpService } from '../login-http.service';
import { JsonMultipartFile } from '../model/JsonMultipartFile';
import { OrderRequest } from '../model/OrderRequest';
import { OrderHttpService } from '../order-http.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  // TO DO: make request to the server idempotent, save users inputs in some service in case he changes
  // component while editing order, ask user to save changes when changes component,
  // obtaining typeOfProductList and arrayOfTastes from server,
  // form validation

  typeOfProductList = ['Tort', 'Babeczki'];
  arrayOfTastes = ['malinowy', 'czekoladowy','truskawkowy'];
  numberOfServingsSet = ['10-15','15-20','20-25'];
  chosenFile : File;
  jsonMultipartFile : JsonMultipartFile;
  isFileInfoDisplayed : boolean = false;
  fileReader : FileReader = new FileReader();
  isUserLoggedIn : boolean;
  isSpinnerDisplayed: boolean = false;
  isSubmitButtonDisabled : boolean = false;
  msg = "Wysyłanie..."

  formGroup: FormGroup;
  constructor(private displayer: DisplayingComponentsSmoothlyService, 
              private orderHttpService : OrderHttpService,
              private router: Router,
              private userService : UserService,
              private dateParserService: DateParserService) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.displayer.dipslayFromBottom("order-mat-card");
    this.userService.getIsUserLoggedIn().subscribe(x => this.isUserLoggedIn = x);
  }

  public createFormGroup (){
    this.formGroup = new FormGroup({

      phoneNumber : new FormControl('', Validators.required),
      eventDate : new FormControl(''),
      typeOfProduct : new FormControl(''),
      numberOfServings: new FormControl(''),
      setOfTastes : new FormControl(new Array<string>()),
      description : new FormControl('')
      
    });

  }


  public onSubmit(){
    
     

    let orderRequest : OrderRequest = new OrderRequest();
    let eventDate: Date = this.formGroup.get("eventDate").value;
    let dateInString = this.dateParserService.parseFromDateToLocalDateString(eventDate);
    orderRequest.eventDate = dateInString;
    orderRequest.phoneNumber = this.formGroup.get('phoneNumber').value;
    orderRequest.typeOfProduct = this.formGroup.get('typeOfProduct').value;
    orderRequest.numberOfServings = this.formGroup.get('numberOfServings').value;
    orderRequest.listOfTastes = this.formGroup.get('setOfTastes').value;
    orderRequest.description = this.formGroup.get('description').value;
    orderRequest.jsonMultipartFile = this.jsonMultipartFile;

    
    this.orderHttpService.createOrder(orderRequest, this.isUserLoggedIn).subscribe(
      (response : HttpResponse<Object>)=> {
  
        
        this.router.navigate(['responseView/' + response.body.toString()]);
      }
    );

    this.isSpinnerDisplayed = true;
    this.isSubmitButtonDisabled = true; 

}
  




  public fileUploadChange(event){

    this.chosenFile = event.target.files[0];
    this.isFileInfoDisplayed = true;

    this.fileReader.onload = () =>{
      let content = (this.fileReader.result as string).replace("data:", "")
      .replace(/^.+,/, "");
      let jsonMultipartFile : JsonMultipartFile = new JsonMultipartFile();
      jsonMultipartFile.name = this.chosenFile.name;
      jsonMultipartFile.base64StringContent = content;
      jsonMultipartFile.contentType = this.chosenFile.type;
      jsonMultipartFile.size = this.chosenFile.size;
      this.jsonMultipartFile = jsonMultipartFile;

 
    }
    if(this.chosenFile !== null){
      this.fileReader.readAsDataURL(this.chosenFile);
    }

  }


}
