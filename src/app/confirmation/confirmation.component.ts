
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {


  @Output()
  confirmation : EventEmitter<any> = new EventEmitter<any>();
  @Output()
  cancelation : EventEmitter<any> = new EventEmitter<any>();

  @Input() 
  msg : string;
  @Input() 
  buttonMsg : string;

  constructor() { }

  ngOnInit(): void {
    
  }

  public confirm(){

    this.confirmation.emit();

  }
  public cancel(){
    this.cancelation.emit();

  }

}
