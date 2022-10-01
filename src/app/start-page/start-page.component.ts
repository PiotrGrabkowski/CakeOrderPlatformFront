import { Component, OnInit } from '@angular/core';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  private arrayOfContents:Array<string> = new Array<string>();

  constructor(private displayer: DisplayingComponentsSmoothlyService) { }

  ngOnInit(): void {
    for (let i =1; i<4; i++){

      this.arrayOfContents.push('content'+i);
    }

    this.arrayOfContents.forEach(el=> this.displayer.dipslayFromBottom(el));

  }

}
