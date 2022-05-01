import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  isChosenFile1Visible: boolean = false;
  chosenFile1Name: string;
  chosenFile1 : File;

  isChosenFile2Visible: boolean = false;
  chosenFile2Name: string;
  chosenFile2 : File;

  description : string = '';

  constructor( private router : Router, private galleryService : GalleryService) {
       


     }

  ngOnInit(): void {
  }

  onFile1InputChage(event){

     const file: File = event.target.files[0];

     this.chosenFile1Name = file.name;
     this.chosenFile1 = file;


     this.isChosenFile1Visible = true;


  }
  onFile2InputChage(event){

    const file: File = event.target.files[0];

    this.chosenFile2Name = file.name;
    this.chosenFile2 = file;

    this.isChosenFile2Visible = true;


 }

  sendFile(){

   this.galleryService.uploadFile(this.chosenFile1, this.chosenFile2, this.description)
    .subscribe((response : HttpResponse<Object>)=>{

      var responseBody = response.body.toString();
      console.log(responseBody);
      this.router.navigate(['responseView/' + responseBody]);
    });
    

  }

}
