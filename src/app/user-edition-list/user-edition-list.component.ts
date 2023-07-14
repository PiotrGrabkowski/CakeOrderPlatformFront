import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Page } from '../model/Page';
import { User } from '../model/User';
import { UserFindRequestOptions } from '../model/UserFindRequestOptions';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edition-list',
  templateUrl: './user-edition-list.component.html',
  styleUrls: ['./user-edition-list.component.css']
})
export class UserEditionListComponent implements OnInit {

  displayedColumns = [];
  displayedColumnsMax = ['username', 'nickname', 'phoneNumber', 'isUserEnabled', 'details' ];
  displayedColumnsMin = ['nickname', 'phoneNumber', 'details'];
  
  users : Array<User>;

  userFindRequestOptions : UserFindRequestOptions = new UserFindRequestOptions();

  currentPage : number = 1;
  numberOfPages : number = 0;
  itemsPerPage : number = 20;
  nextPlaceholder : string = '';
  previousPlaceholder : string = '';
  

  filterFormGroup : FormGroup;

  constructor(private router : Router, private userService : UserService) { }

  ngOnInit(): void {
    this.userFindRequestOptions.user = new User();
    this.userFindRequestOptions.page = new Page<User>();
    this.userFindRequestOptions.page.currentPage = this.currentPage;
    this.userFindRequestOptions.page.itemsPerPage = this.itemsPerPage;
    this.getAllUsers(this.userFindRequestOptions);

  
  }

  filter(){

  }
  cancelFilter(){

  }
  private getAllUsers(userFindRequestOptions : UserFindRequestOptions){
    this.userService.getAllUsers(userFindRequestOptions).subscribe(page=>{
      this.currentPage = page.currentPage;
      this.numberOfPages = page.numberOfPages;
      this.users = page.listOfItems;
      this.setNavigationPlaceholders();
      this.setColumnsInRegardToScreenSize();
    })


  }
  private setNavigationPlaceholders(){
    if(this.currentPage < this.numberOfPages && this.numberOfPages >1){
      this.nextPlaceholder = 'Następna strona';
    }
    else{
      this.nextPlaceholder = '';
    }
    if(this.currentPage >1){
      this.previousPlaceholder = 'Poprzednia strona';
    }
    else{
      this.previousPlaceholder = '';
    }


  }
  next(){
    if(this.currentPage<this.numberOfPages){
      this.userFindRequestOptions.page.currentPage = this.userFindRequestOptions.page.currentPage + 1;
      this.currentPage = this.currentPage + 1;
      this.getAllUsers(this.userFindRequestOptions);
      this.setNavigationPlaceholders();
      
      }

  }
  previous(){
    if(this.currentPage>1){
      this.userFindRequestOptions.page.currentPage = this.userFindRequestOptions.page.currentPage - 1;
      this.currentPage = this.currentPage - 1;
      this.getAllUsers(this.userFindRequestOptions);
      this.setNavigationPlaceholders();
     

    }
   


  }
  private setColumnsInRegardToScreenSize(){
    let screenSize = screen.width;
    if(screenSize <600){

      this.displayedColumns = this.displayedColumnsMin;
    }
    else {
      this.displayedColumns = this.displayedColumnsMax;
    }
  }

  @HostListener('window:resize', ['$event'])
  public handleScreenResize(){
    this.setColumnsInRegardToScreenSize();

  }
  public navigateToDetails(id : string){
  
    this.router.navigate(['user_by_admin_edition/', id]);

  }

  public checkStatusClass(user: User): string{
    if(user.userEnabled === "TRUE"){
      return "green";    
    }
    else{
      return "red";
    }
  }

  public checkStatusInfo(user: User) :string {
    if(user.userEnabled === "TRUE"){
      return "Aktywne";    
    }
    else{
      return "Nieaktywne";
    }

  }

}
export interface UserStatus{
  class : string;
  info : string;
}
