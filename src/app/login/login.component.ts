import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';
import { LoginHttpService } from '../login-http.service';
import { LoginRequest } from '../model/LoginRequest';






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



    constructor(private router: Router, 
      private loginHttp : LoginHttpService, 
      private activatedRoute : ActivatedRoute,
      private displayer: DisplayingComponentsSmoothlyService) { 
      
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

        this.errorMsg = params.get('errorMsg');
        if(this.errorMsg){

          this.isErrorDisplayed = true;

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
      const loginRequest : LoginRequest = Object.assign({}, this.formGroup.value);
      let jwt : string;
      let role : string;
      let responseBody : string;

      this.loginHttp.login(loginRequest).subscribe(
        (response : HttpResponse<Object>) => 
          {
            jwt = response.headers.get('Authorization');
            role = response.headers.get('Role');
            responseBody = response.body.toString();
            this.loginHttp.setIsUserLoggedIn(true);
            localStorage.setItem('jwt', jwt);
            this.router.navigate(['responseView/' + responseBody]);
            console.log(jwt + ' ' + role + ' ' + responseBody);
          },

        (error : HttpErrorResponse) => 
          {
            let msg = error.error;
            let status = error.status;
            console.log ("status: " + status +", wiadomosc: " + msg);

            this.router.navigate(['login', {errorMsg : msg}]);
        
            
            


          }
      );
      
  
  
    }
  
    public isFormNotValid(): boolean{
  
      return !this.formGroup.valid;
    }

    public routToForgottenPassword(){

      this.router.navigate(['/forgottenPassword']);
    }
  
  
  }