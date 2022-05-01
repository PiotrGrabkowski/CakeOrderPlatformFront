import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { GalleryService } from '../gallery.service';
import { GalleryItem } from '../model/GalleryItem';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  albums= [];
  galleryItems : Array<GalleryItem> = [];


  constructor(private _lightbox: Lightbox, private galleryService : GalleryService) { 


  }

  ngOnInit(): void {

    this.galleryService.getWholeGallery().subscribe(gallery => {
      this.galleryItems = gallery;
      console.log(this.galleryItems);
      for(let j = 0; j< this.galleryItems.length; j++){
        const src = this.galleryItems[j].image.url;
        const caption = this.galleryItems[j].description;
        const thumb = this.galleryItems[j].imageThumb.url;
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
