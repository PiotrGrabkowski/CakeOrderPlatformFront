
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  @Input()
  buttonDisabled = false;

  @Output()
  confirmation : EventEmitter<any> = new EventEmitter<any>();
  @Output()
  cancelation : EventEmitter<any> = new EventEmitter<any>();

  @Input() 
  msg : string;
  @Input() 
  buttonMsg : string = 'Potwierdź';

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
export class ConfirmationComponentConfig{
  buttonDisabled : boolean;
  msg : string;
  buttonMsg : string;
  visible : boolean;
}
