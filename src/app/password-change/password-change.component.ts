import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';
import { PasswordChangeRequest } from '../model/PasswordChangeRequest';
import { User } from '../model/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  formGroup: FormGroup;
  type = 'password';
  isNewPasswordHidden = true;
  isOldPasswordHidden = true;

  constructor(private displayer : DisplayingComponentsSmoothlyService, private userService : UserService, private router : Router) { }

  ngOnInit() {
    this.createFormGroup();
  
    this.displayer.dipslayFromBottom("changePassword-mat-card");

   
  }



  
  changeVisibility(){

    if(this.type === 'password'){
      this.type = 'text';
      this.isNewPasswordHidden = false;
      this.isOldPasswordHidden = false;
    }
    else if(this.type === 'text'){

      this.type = 'password';
      this.isNewPasswordHidden = true;
      this.isOldPasswordHidden = true;
    }

   
   }
    
   
  

    createFormGroup  () {
  
  
  
      this.formGroup = new FormGroup({
  
        username : new FormControl('', Validators.required),
        oldPassword : new FormControl('', Validators.required),
        newPassword : new FormControl('', Validators.required)
  
      });
  
    }
    public checkIfUsernameIsAbsent(): boolean{
      if(this.formGroup.get('username').hasError('required') && this.formGroup.get('username').touched){
  
        return true;
      }
      return false;
    }
  
    public checkIfOldPasswordIsAbsent(): boolean{
  
      if(this.formGroup.get('oldPassword').hasError('required') && this.formGroup.get('oldPassword').touched){
  
        return true;
      }
      return false;
  
    }
    public checkIfNewPasswordIsAbsent(): boolean{
  
      if(this.formGroup.get('newPassword').hasError('required') && this.formGroup.get('newPassword').touched){
  
        return true;
      }
      return false;
  
    }

  
    public onSubmit(): void {
      

      const passwordChangeRequest : PasswordChangeRequest = new PasswordChangeRequest();
      const user : User = new User();
      user.username = this.formGroup.get('username').value;
      passwordChangeRequest.userDTO = user;
      passwordChangeRequest.oldPassword = this.formGroup.get('oldPassword').value;
      passwordChangeRequest.newPassword = this.formGroup.get('newPassword').value;
      this.userService.changePassword(passwordChangeRequest).subscribe(
        response=> {

          this.router.navigate(['responseView/' + response]);
        }

      );



     


      
  
  
    }
  
    public isFormNotValid(): boolean{
  
      return !this.formGroup.valid;
    }

  


  


}
