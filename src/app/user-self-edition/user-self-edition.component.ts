import { Component, OnInit } from '@angular/core';
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

  nicknameActive = false;
  phoneNumberActive = false;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(u => {
      this.user = u;
      this.newNickname = u.nickname;
      this.newPhoneNumber = u.phoneNumber;
    });
  }

  public updateUserInfo(){


  }
  public makeNicknameActive(){

    this.nicknameActive = true;
  }
  public makePhoneNumberActive(){

    this.phoneNumberActive = true;
  }

}
