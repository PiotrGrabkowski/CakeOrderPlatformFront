import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private displayer: DisplayingComponentsSmoothlyService) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.displayer.dipslayFromBottom("order-mat-card");
  }

  createFormGroup (){
    this.formGroup = new FormGroup({

      phoneNumber : new FormControl('', Validators.required),
      eventDate : new FormControl(''),
      mail : new FormControl(''),
      typeOfProduct : new FormControl(''),
      numberOfServings: new FormControl(''),
      setOfTastes : new FormControl(''),
      description : new FormControl(''),
      exampleLink : new FormControl(''),
      pictureExample : new FormControl('')
    });

  }
  onSubmit(){
    console.log(this.formGroup.get('pictureExample').value);


  }


}
