import {  HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register-confirmation',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.css']
})
export class RegisterConfirmationComponent implements OnInit {

  constructor(private registerService : RegisterService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let token;
   
    this.activatedRoute.paramMap.subscribe(
      (params: Params) => {
        token = params.get('token');
        this.registerService.confirmRegistration(token).subscribe(
          (response : HttpResponse<Object>) =>{
          let msg = response.body.toString();
          this.router.navigate(['responseView/' + msg]);
          }


        )
      
      }
      
    )
  }

}
