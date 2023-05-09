import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginHttpService } from '../login-http.service';
import { Role } from '../model/Role';
import { UserService } from '../user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CakeOrderPlatform';

  isUserLoggedIn: boolean = false;
  isAdminLoggedIn : boolean = false;
  userRole : string;
  sidenavOpened = false;
  role : Role = new Role();

  navigationClass = 'nav-off';
  curtainClass = 'curtain-off';


  constructor(private router: Router, private userService : UserService){


  }
  ngOnInit(): void {
   this.userService.getCurrentUser().subscribe(user => {
    
    if(user!==null){
      if(user.role === this.role.ADMIN ){
           this.isAdminLoggedIn = true;
         }


    }
    else{
      this.isAdminLoggedIn = false;

    }

   }
  
    );
    this.userService.getIsUserLoggedIn().subscribe(x => this.isUserLoggedIn = x);
  //  this.userService.getCurrentUser().subscribe(user => 
    //  console.log('Rola uzytkownika: ' + user.role));
  //    if(user === null){
    //    this.isAdminLoggedIn = false;
     // }
     // if(user.role === this.role.ADMIN ){
     //   this.isAdminLoggedIn = true;
     // }

  //  });

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
