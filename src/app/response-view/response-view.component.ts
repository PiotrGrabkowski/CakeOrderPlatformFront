import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-response-view',
  templateUrl: './response-view.component.html',
  styleUrls: ['./response-view.component.css']
})
export class ResponseViewComponent implements OnInit {

  info : string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params : Params) => {

      return this.info = params.get('response');

    });
  }

}
