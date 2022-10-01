import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DisplayingComponentsSmoothlyService } from '../displaying-components-smoothly.service';

import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  isChosenFileVisible: boolean = false;
  chosenFileName: string;
  chosenFile : File;
  description : string = '';

  constructor( private router : Router, 
    private galleryService : GalleryService,
    private displayer: DisplayingComponentsSmoothlyService) {
       


     }

  ngOnInit(): void {
    this.displayer.dipslayFromBottom("file-upload-mat-card");
  }

  onFileInputChage(event){

     const file: File = event.target.files[0];

     this.chosenFileName = file.name;
     this.chosenFile = file;


     this.isChosenFileVisible = true;


  }


  sendFile(){

   this.galleryService.uploadFile(this.chosenFile, this.description)
    .subscribe((response : HttpResponse<Object>)=>{

      var responseBody = response.body.toString();
      console.log(responseBody);
      this.router.navigate(['responseView/' + responseBody]);
    });
    

  }

}
