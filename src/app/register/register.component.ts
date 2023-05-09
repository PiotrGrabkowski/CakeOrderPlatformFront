import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';
import { RegisterRequest } from '../model/RegisterRequest';
import { RegisterService } from '../register.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  isPasswordHidden = true;
  type :string = 'password';
  userAlreadyExists : boolean = false;
  typedUsername : string = '';
  constructor(private router: Router, 
    private registerService: RegisterService,
    private displayer: DisplayingComponentsSmoothlyService,
    private userService : UserService) {

  }

  ngOnInit(): void {
    this.createFormGroup();
    this.displayer.dipslayFromBottom("register-mat-card");
    this.formGroup.get('username').valueChanges.pipe(debounceTime(800),map(e => this.formGroup.get('username').value),distinctUntilChanged()).subscribe(username=>{
      this.userService.checkIfUserAlreadyExists(username).subscribe(flag => {
        this.typedUsername = username;
        this.userAlreadyExists = flag;
        if(flag){
          this.formGroup.get('username').setErrors({'incorrect': true});
        }
        
        
      });

    });

  }
  createFormGroup() {

    this.formGroup = new FormGroup({

      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      nickname: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)

    });

  }
  public checkIfFieldIsEmpty(nameOfField: string): boolean {
    if (this.formGroup.get(nameOfField).hasError('required') && this.formGroup.get(nameOfField).touched) {

      return true;
    }
    return false;
  }

  public checkIfEmailIsInvalid(): boolean {

    if (this.formGroup.get('username').hasError('email') && this.formGroup.get('username').touched) {

      return true;
    }
    return false;

  }

  public onSubmit(): void {
    let msg: string;
    const registerRequest: RegisterRequest = Object.assign({}, this.formGroup.value);
    this.registerService.registerUser(registerRequest).subscribe(
      (response: HttpResponse<Object>) => {
        msg = response.body.toString();
        this.router.navigate(['responseView/' + msg]);
      },

      (error: HttpErrorResponse) => {

        let msg = error.error;
        let status = error.status;
        console.log("status: " + status + ", wiadomosc: " + msg);

        this.router.navigate(['login', { errorMsg: msg }]);
      }



    );

    console.log(registerRequest);


  }

  public isFormNotValid(): boolean {

    return !this.formGroup.valid;
  }
  public routToLogin() {

    this.router.navigate(['/login']);
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

}


