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
  spinnerDisplayed: boolean = false;
  chosenFileName: string;
  chosenFileSize: number;
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

    const that = this;


     const file: File = event.target.files[0];

     const container = document.querySelector(".img-div");
     const containerChildren = container.children;
     Array.from(containerChildren).forEach(e=>{
        if(e.tagName==='IMG' || e.tagName === 'SPAN'){

          e.remove();
        }

     });
     const nameSpan = document.createElement("span");
     const sizeSpan = document.createElement("span");
     this.spinnerDisplayed=true;

     this.chosenFileName = file.name;
     this.chosenFileSize = file.size;
     nameSpan.innerText = 'Wybrano plik: ' + this.chosenFileName;
     sizeSpan.innerText = 'Rozmiar pliku: ' + Math.round(this.chosenFileSize/1000) +'KB';
     
     this.chosenFile = file;
    
     
     const fileReader = new FileReader();
     fileReader.readAsDataURL(file);
     fileReader.onload = function(){
      const img = new Image();
      img.setAttribute('width','90%');
      img.setAttribute('height', '50%');

      if(typeof fileReader.result ==='string'){
      img.src = fileReader.result;
      }
      that.spinnerDisplayed = false;

      container.appendChild(img);
      container.appendChild(nameSpan);
      container.appendChild(sizeSpan);
      


     };

  
     


     


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
