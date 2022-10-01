import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayingComponentsSmoothlyService {

  constructor() { }


  dipslayFromBottom(idOfElement: string){
    const el = document.getElementById(idOfElement);
    el.style.transition="all";
    el.style.transitionDuration = "0.5s";
    el.style.transitionTimingFunction = "linear";
    el.style.transform = "translateY(800px)";

    function showElement(){
      el.style.transform = "translateY(0)";
    }
    setTimeout(showElement, 200);

  }
}
