import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';
import { RegisterRequest } from '../model/RegisterRequest';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private router: Router, 
    private registerService: RegisterService,
    private displayer: DisplayingComponentsSmoothlyService) {

  }

  ngOnInit(): void {
    this.createFormGroup();
    this.displayer.dipslayFromBottom("register-mat-card");

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

}


