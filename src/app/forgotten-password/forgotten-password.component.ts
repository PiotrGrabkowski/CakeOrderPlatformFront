import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';
import { LoginHttpService } from '../login-http.service';
import { User } from '../model/User';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {

  username : string = '';
  isSpinnerDisplayed = false;
  constructor(private displayer: DisplayingComponentsSmoothlyService,
    private loginService : LoginHttpService,
    private router : Router) {
    
   }

  ngOnInit(): void {
    this.displayer.dipslayFromBottom("mat-card");
  }
  public confirmPasswordRestoration(event){
    let user : User = new User();
    user.username = this.username;
    this.isSpinnerDisplayed = true;
    this.loginService.restorePassword(user).subscribe( (response : string) =>
    {
      this.router.navigate(['responseView/' + response]);
      this.isSpinnerDisplayed = false;
      
    }
      
    );
  }
  public cancelRestoration(event){
    this.username = '';
    this.router.navigate(['login']);
  }
}
