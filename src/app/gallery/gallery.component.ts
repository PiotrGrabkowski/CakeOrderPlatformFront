import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { GalleryService } from '../gallery.service';

import { Image } from '../model/Image';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  albums= [];
  listOfImages : Array<Image> = [];


  constructor(private _lightbox: Lightbox, private galleryService : GalleryService) { 


  }

  ngOnInit(): void {

    this.galleryService.getWholeGallery().subscribe(gallery => {
      this.listOfImages = gallery;
      
      for(let j = 0; j< this.listOfImages.length; j++){
        const src = this.listOfImages[j].url;
        const caption = this.listOfImages[j].description;
        const thumb = this.listOfImages[j].url;
        console.log(thumb);
        const album = {

          src : src,
          caption : caption,
          thumb : thumb

        }
        this.albums.push(album);

      }

    })
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.albums, index);
  }



} 
