import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Taste } from '../model/Taste';
import { TasteHttpService } from '../taste-http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  listOfTastes : Array<Taste>;
  newTasteName : string;
  confirmationScreenShown : boolean = false;
  tasteToDelete : Taste;
  msg = 'Czy na pewno chcesz usunąć ten smak?';

  notificationFormGroup : FormGroup;
  
  constructor(private tasteService : TasteHttpService, private router : Router) {
    this.notificationFormGroup = new FormGroup({

      smsNotifications : new FormControl(true)

    })
   }

  ngOnInit(): void {
    this.populateListOfTastes();
  }

  public populateListOfTastes(){

    this.tasteService.getAll().subscribe(array => this.listOfTastes = array);
   // this.listOfTastes = this.createTestListOfTastes();

  }

  public createTestListOfTastes(){
    let taste1 = new Taste();
    taste1.id = 1;
    taste1.name = 'czekoladowy';
    let taste2 = new Taste();
    taste2.id = 2;
    taste2.name = 'truskawkowy';
    let taste3 = new Taste();
    taste3.id = 3;
    taste3.name = 'waniliowy';
    let array = [taste1, taste2, taste3];
    return array;

  }
  

  public addTaste(){
    let taste : Taste = new Taste();
    taste.name = this.newTasteName;
    taste.toPersist= true;
    this.listOfTastes.push(taste);
    this.newTasteName = '';
  }
  public confirmDeletion(){

    if(this.tasteToDelete.toPersist){

      this.listOfTastes = this.listOfTastes.filter(t => t.name !== this.tasteToDelete.name);
    }
    else{
      this.tasteToDelete.toDelete = true;
    }
    
    this.tasteToDelete = null;
    this.confirmationScreenShown = false;
    console.log(this.listOfTastes);

  }
  public cancelDeletion(){

    this.confirmationScreenShown = false;
    this.tasteToDelete = null;
  }
  public deleteTaste(taste : Taste){
    this.confirmationScreenShown = true;
    this.tasteToDelete = taste;
    
  }

  public saveChangesToTastes(){

    this.tasteService.update(this.listOfTastes).subscribe(
      (response : HttpResponse<Object>)=> {

        this.router.navigate(['responseView/' + response.body.toString()]);
      }


    );
  }

  public notificationOnSubmit(){


  }

}
