import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginHttpService } from '../login-http.service';
import { UserService } from '../user.service';

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

  navigationClass = 'nav-off';
  curtainClass = 'curtain-off';


  constructor(private router: Router, private userService : UserService){


  }
  ngOnInit(): void {
   
    this.userService.getIsUserLoggedIn().subscribe(x => this.isUserLoggedIn = x);

  }

 

public toggleNavigation(){
  if(this.navigationClass === 'nav-on'){

    this.closeNavigation();
  }
  else{
    this.navigationClass = 'nav-on';
    this.curtainClass = 'curtain-on';
  }

 

}
public closeNavigation(){
  this.navigationClass = 'nav-off';
  this.curtainClass = 'curtain-off';
  window.scroll({
    top: 0,
    left: 0,
    behavior : 'smooth'


});


}


public onNavigateClick(rout : string){

  this.router.navigate([rout]);

}
 
  public onLogoutButtonClick(){

    let msg = 'Zostałeś poprawnie wylogowany z aplikacji'
    localStorage.removeItem('jwt');
    this.userService.setIsUserLoggedIn(false);
    this.userService.setCurrentUser(null);

    this.router.navigate(['responseView/' + msg]);
  }




 




  
}
