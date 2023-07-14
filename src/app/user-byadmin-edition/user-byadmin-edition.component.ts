import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';
import { User } from '../model/User';
import { UserService } from '../user.service';
import { switchMap } from 'rxjs/operators';
import { ConfirmationComponentConfig } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-user-byadmin-edition',
  templateUrl: './user-byadmin-edition.component.html',
  styleUrls: ['./user-byadmin-edition.component.css']
})
export class UserByadminEditionComponent implements OnInit {
  user : User;

  deleteConfirmConfig : ConfirmationComponentConfig = new ConfirmationComponentConfig();
  activateConfirmConfig : ConfirmationComponentConfig = new ConfirmationComponentConfig();
  blockConfirmConfig : ConfirmationComponentConfig = new ConfirmationComponentConfig();

  isSpinnerDisplayed : boolean = false;
  msg : string = '';
  statusChangeMsg = 'Zmiana statusu konta...';
  deleteMsg = 'Usuwanie użytkownika...';
  


  constructor(private displayer : DisplayingComponentsSmoothlyService,
    private activatedRoute : ActivatedRoute,private userService : UserService, private router : Router) { }

  ngOnInit(): void {
    this.displayer.dipslayFromBottom('my-mat-card');

    this.deleteConfirmConfig.buttonMsg = "Usuń";
    this.deleteConfirmConfig.msg = "Czy na pewno usunąć użytkownika?";
    this.deleteConfirmConfig.visible = false;

    this.activateConfirmConfig.buttonMsg = "Aktywuj";
    this.activateConfirmConfig.msg = "Czy na pewno aktywować konto użytkownika?";
    this.activateConfirmConfig.visible = false;

    this.blockConfirmConfig.buttonMsg = "Zablokuj";
    this.blockConfirmConfig.msg = "Czy na pewno zablokować konto użytkownika?";
    this.blockConfirmConfig.visible = false;
    
    
    this.activatedRoute.paramMap.pipe(switchMap((params : Params)=> {
      
      return this.userService.getUserById(params.get('id'));

    })).subscribe(element => {
      this.user = element;

  });

  }
  public blockAccount(){
    this.blockConfirmConfig.visible = true;
  }
  public activateAccount(){
    this.activateConfirmConfig.visible = true;
  }

  public confirmActivation(event){
    
    this.msg = this.statusChangeMsg;
    this.isSpinnerDisplayed = true;
    this.userService.updateUserStatus(this.user.id, true).subscribe(
      response =>{
        console.log(response);
        this.isSpinnerDisplayed = false;
        this.router.navigate(['responseView/' + response]);
  
      }
    );
  }
  public confirmBlockage(event){
    this.msg = this.statusChangeMsg;
    this.isSpinnerDisplayed = true;
    this.userService.updateUserStatus(this.user.id, false).subscribe(
      response =>{
        console.log(response);
        this.isSpinnerDisplayed = false;
        this.router.navigate(['responseView/' + response]);
      }
    );
  }
  public cancelActivation(event){
    this.activateConfirmConfig.visible = false;
  }
  public cancelBlockage(event){
    this.blockConfirmConfig.visible = false;
  }
  public checkIfUserIsEnabled(): boolean{
    if(this.user.userEnabled === "TRUE"){
      return true;    
    }
    else{
      return false;
    }
  }


  public checkStatusClass(): string{
    if(this.user.userEnabled === "TRUE"){
      return "green";    
    }
    else{
      return "red";
    }
  }

  public checkStatusInfo() :string {
    if(this.user.userEnabled === "TRUE"){
      return "Aktywne";    
    }
    else{
      return "Nieaktywne";
    }

  }
  public confirmDelete(event){
    this.msg = this.deleteMsg;
    this.isSpinnerDisplayed = true;
    this.userService.deleteUserById(this.user.id).subscribe(response =>{
      this.isSpinnerDisplayed = false;
      this.router.navigate(['responseView/' + response]);

    });
  }
  public cancelDelete(event){
    this.deleteConfirmConfig.visible = false;

  }
  public delete(){
    this.deleteConfirmConfig.visible = true;


  }

}
