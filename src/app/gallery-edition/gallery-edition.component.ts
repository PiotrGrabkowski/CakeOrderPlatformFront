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

  }

  public deleteImage(){

    const url : string = Config.SERVERBASEURL + '/image/' + this.chosenImage.publicId;
    const msg : string = 'Czy na pewno chcesz usunąć to zdjęcie?';
    this.router.navigate(['confirmation/' + url +"/" + msg]);


  }
  public changeDesciption(){


  }


}
