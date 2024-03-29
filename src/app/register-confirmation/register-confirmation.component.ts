import {  HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService } from '../confirmation.service';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register-confirmation',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.css']
})
export class RegisterConfirmationComponent implements OnInit {

  constructor(private confirmationService : ConfirmationService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let token;
    let action;
   
    this.activatedRoute.paramMap.subscribe(
      (params: Params) => {
        token = params.get('token');
        action = params.get('action');
        if(action=== 'registration'){
          this.confirmationService.confirmRegistration(token).subscribe(
            (response : HttpResponse<Object>) =>{
            let msg = response.body.toString();
            this.router.navigate(['responseView/' + msg]);
          });
        }
        else if(action === 'restoration'){
          this.confirmationService.confirmRestoration(token).subscribe(
            (response : HttpResponse<Object>) =>{
            let msg = response.body.toString();
            this.router.navigate(['responseView/' + msg]);
          });

        }


        
      
      }
      
    )
  }

}
