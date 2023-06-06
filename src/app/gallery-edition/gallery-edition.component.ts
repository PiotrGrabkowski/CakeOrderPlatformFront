import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../config/config';
import { GalleryService } from '../gallery.service';
import { Image } from '../model/Image';

@Component({
  selector: 'app-gallery-edition',
  templateUrl: './gallery-edition.component.html',
  styleUrls: ['./gallery-edition.component.css']
})
export class GalleryEditionComponent implements OnInit {

  listOfImages : Array<Image> = [];
  chosenImage : Image;
  confVisible : boolean = false;
  msg : string = 'Czy na pewno chcesz usunąć to zdjęcie?';
  msg2 : string = 'Usuwanie zdjęcia...';
  spinnerDisplayed = false;
  buttonDisabled = false;

  constructor(private router: Router, private galleryService : GalleryService) { }

  ngOnInit(): void {
    this.galleryService.getWholeGallery().subscribe(gallery => {
      this.listOfImages = gallery;});
  }
  public addToGallery(){

    this.router.navigate(['fileUpload']);

  }

  public clickImage(image: Image){
    this.chosenImage = image;
    console.log (this.chosenImage);

  }

  public deleteImage(){

    
    this.confVisible = true;
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    


  }

  public confirm(event){
    this.spinnerDisplayed = true;
    this.buttonDisabled = true;
    
    this.galleryService.deleteImageById(this.chosenImage.id).subscribe(

      (response : HttpResponse<string>)=>{

        this.router.navigate(['responseView/' + response.body])
        this.spinnerDisplayed = false;
      }
        
        





    );

  }

  public cancel(event){
    this.confVisible = false;


  }
  public changeDesciption(){


  }


}
