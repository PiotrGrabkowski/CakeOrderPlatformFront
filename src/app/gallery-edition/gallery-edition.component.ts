import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryService } from '../gallery.service';
import { Image } from '../model/Image';

@Component({
  selector: 'app-gallery-edition',
  templateUrl: './gallery-edition.component.html',
  styleUrls: ['./gallery-edition.component.css']
})
export class GalleryEditionComponent implements OnInit {

  listOfImages : Array<Image> = [];

  constructor(private router: Router, private galleryService : GalleryService) { }

  ngOnInit(): void {
    this.galleryService.getWholeGallery().subscribe(gallery => {
      this.listOfImages = gallery;});
  }
  public addToGallery(){

    this.router.navigate(['fileUpload']);

  }

}
