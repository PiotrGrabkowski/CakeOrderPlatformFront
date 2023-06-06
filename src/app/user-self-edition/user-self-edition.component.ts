import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from '../model/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-self-edition',
  templateUrl: './user-self-edition.component.html',
  styleUrls: ['./user-self-edition.component.css']
})
export class UserSelfEditionComponent implements OnInit {

  user : User;
  newNickname : string;
  newPhoneNumber : string;

  spinnerDisplayed = false;
  msg = 'Trwa zapisywanie zmian';

  nicknameActive = false;
  phoneNumberActive = false;

  nicknamePlaceholder = 'Wpisz imię';
  phoneNumberPlaceholder = 'Wpisz numer telefonu';


  constructor(private userService : UserService,
              private router : Router) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(u => {
      this.user = u;
      this.newNickname = u.nickname;
      this.newPhoneNumber = u.phoneNumber;
      if (this.newNickname !== ''){

        this.nicknamePlaceholder = '';
  
      }
      else{
        this.nicknamePlaceholder = 'Wpisz imię';
      }
      if (this.newPhoneNumber !== ''){

        this.phoneNumberPlaceholder = '';
  
      }
      else{
        this.phoneNumberPlaceholder = 'Wpisz numer telefonu';
      }
    });

 


  }

  public updateUserInfo(){
    this.spinnerDisplayed = true;
    this.user.nickname = this.newNickname;
    this.user.phoneNumber = this.newPhoneNumber;
    console.log(this.user);
    this.userService.updateUser(this.user).subscribe(response =>{

      
      this.router.navigate(['responseView/' + response]);
      this.spinnerDisplayed = false;
    });




  }
  public makeNicknameActive(){

    this.nicknameActive = true;
  }
  public makePhoneNumberActive(){

    this.phoneNumberActive = true;
  }


  public nicknameFocusOut(){

    if (this.newNickname !== ''){

      this.nicknamePlaceholder = '';

    }
    else{
      this.nicknamePlaceholder = 'Wpisz imię';
    }
    
  }
  public phoneNumberFocusOut(){

    if (this.newPhoneNumber !== ''){

      this.phoneNumberPlaceholder = '';

    }
    else{
      this.phoneNumberPlaceholder = 'Wpisz numer telefonu';
    }
    
  }

}
