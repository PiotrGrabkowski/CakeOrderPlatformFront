import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService } from '../confirmation.service';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';
import { LoginHttpService } from '../login-http.service';
import { LoginRequest } from '../model/LoginRequest';
import { LoginResponse } from '../model/LoginResponse';
import { User } from '../model/User';
import { UserService } from '../user.service';






@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


 

    formGroup: FormGroup;
    isErrorDisplayed : boolean = false;
    errorMsg : string;
    type = 'password';
    isPasswordHidden = true;
    isButtonDisabled : boolean = false;
    isSpinnerDisplayed : boolean = false;
    msg = 'Logowanie...';
    



    constructor(private router: Router, 
      private activatedRoute : ActivatedRoute,
      private displayer: DisplayingComponentsSmoothlyService,
      private confirmationService : ConfirmationService,
      private userService : UserService) { 
      
    }
  
   changeVisibility(){

    if(this.type === 'password'){
      this.type = 'text';
      this.isPasswordHidden = false;
    }
    else if(this.type === 'text'){

      this.type = 'password';
      this.isPasswordHidden = true;
    }

   
   }
    
   
  
    ngOnInit() {

      
      this.createFormGroup();
      this.activatedRoute.paramMap.subscribe((params : Params) =>{
        //let msg = params.get('errorMsg');
       // let decodedMsg = decodeURIComponent(msg.replace(/\+/g, " "));
        this.errorMsg = params.get('errorMsg');
        if(this.errorMsg){

          this.isErrorDisplayed = true;
          this.isSpinnerDisplayed = false;
          this.isButtonDisabled = false;

        }
      });
      this.displayer.dipslayFromBottom("login-mat-card");

     
    }
    createFormGroup  () {
  
  
  
      this.formGroup = new FormGroup({
  
        username : new FormControl('', Validators.required),
        password : new FormControl('', Validators.required)
       
  
      });
  
    }
    public checkIfUsernameIsAbsent(): boolean{
      if(this.formGroup.get('username').hasError('required') && this.formGroup.get('username').touched){
  
        return true;
      }
      return false;
    }
  
    public checkIfPasswordIsAbsent(): boolean{
  
      if(this.formGroup.get('password').hasError('required') && this.formGroup.get('password').touched){
  
        return true;
      }
      return false;
  
    }

  
    public onSubmit(): void {
      this.isSpinnerDisplayed = true;
      this.isButtonDisabled = true;
      const loginRequest : LoginRequest = Object.assign({}, this.formGroup.value);
      let jwt : string;
      let user : User;
      let msg : string;
      

      this.userService.login(loginRequest).subscribe(
        (response : HttpResponse<LoginResponse>) => 
          {
            jwt = response.headers.get('Authorization');
            user = response.body.user;
            msg = response.body.msg;

            this.userService.setIsUserLoggedIn(true);
            this.userService.setCurrentUser(user);
            
            localStorage.setItem('jwt', jwt);

            this.router.navigate(['responseView/' + msg]);
            this.isSpinnerDisplayed = false;
            this.isButtonDisabled = false;
            
          }
          ,

         (error : HttpErrorResponse) => 
          {
            this.isSpinnerDisplayed = false;
            this.isButtonDisabled = false;
        //     let msg = error.error;
        //     let status = error.status;
        //     console.log ("status: " + status +", wiadomosc: " + msg);

        //     this.router.navigate(['login', {errorMsg : msg}]);

          }
          ,
          () =>{
            this.isSpinnerDisplayed = false;
            this.isButtonDisabled = false;

          }
      );
      
  
  
    }
  
    public isFormNotValid(): boolean{
  
      return !this.formGroup.valid;
    }

    public isSubmitButtonDisabled(): boolean{

      return this.isFormNotValid() || this.isButtonDisabled;
    }

    public routToForgottenPassword(){

      this.router.navigate(['/forgottenPassword']);
    }


  

  
  
  
  }