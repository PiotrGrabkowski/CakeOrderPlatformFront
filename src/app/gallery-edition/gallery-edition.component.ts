import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery-edition',
  templateUrl: './gallery-edition.component.html',
  styleUrls: ['./gallery-edition.component.css']
})
export class GalleryEditionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  public addToGallery(){

    this.router.navigate(['fileUpload']);

  }

}
