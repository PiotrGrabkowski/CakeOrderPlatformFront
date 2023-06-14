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

  currentPage : number = 1;
  numberOfPages : number;
  itemsPerPage : number = 2;

  nextPlaceholder : string = '';
  previousPlaceholder : string = '';


  constructor(private router: Router, private galleryService : GalleryService) { }

  ngOnInit(): void {
    this.galleryService.getGalleryByPage(this.currentPage,this.itemsPerPage).subscribe(page => {
      console.log(page);
      this.listOfImages = page.listOfItems;
      this.numberOfPages = page.numberOfPages;
      this.setNavigationPlaceholders();

    
    });
  }
  setNavigationPlaceholders(){
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
      this.currentPage = this.currentPage + 1;
      this.galleryService.getGalleryByPage(this.currentPage,this.itemsPerPage).subscribe(page => {
        this.listOfImages = page.listOfItems;
        this.numberOfPages = page.numberOfPages;
        this.setNavigationPlaceholders();
      
      });

    }
  

  }
  previous(){
    if(this.currentPage>1){
      this.currentPage = this.currentPage - 1;
      this.galleryService.getGalleryByPage(this.currentPage,this.itemsPerPage).subscribe(page => {
        this.listOfImages = page.listOfItems;
        this.numberOfPages = page.numberOfPages;
        this.setNavigationPlaceholders();
      
      });

    }
   


  }
  public addToGallery(){

    this.router.navigate(['fileUpload']);

  }

  public clickImage(image: Image){
    this.chosenImage = image;
    

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
