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
    
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    this.activatedRoute.paramMap.subscribe((params : Params) => {

      let msg =  params.get('response');
      return this.info = decodeURIComponent(msg.replace(/\+/g, " "));

    });
  }

}
