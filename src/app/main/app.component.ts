import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginHttpService } from '../login-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CakeOrderPlatform';

  isUserLoggedIn: boolean = false;
  userRole : string;
  sidenavOpened = false;


  constructor(private router: Router, private loginHttp : LoginHttpService){


  }
  ngOnInit(): void {
   // this.router.navigate(['start']);
    this.loginHttp.getIsUserLoggedIn().subscribe(x => this.isUserLoggedIn = x);
  }

 

    
public changeSidenavState(){

  this.sidenavOpened = !this.sidenavOpened;
}

public onNavigateClick(rout : string){

  this.router.navigate([rout]);

}
 
  public onLogoutButtonClick(){

    let msg = 'Zostałeś poprawnie wylogowany z aplikacji'
    localStorage.removeItem('jwt');
    this.loginHttp.setIsUserLoggedIn(false);

    this.router.navigate(['responseView/' + msg]);
  }




 




  
}
