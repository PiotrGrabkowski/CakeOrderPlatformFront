import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from './config/config';
import { GalleryItem } from './model/GalleryItem';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private url : string = Config.SERVERBASEURL + '/image/gallery';

  constructor(private httpClient : HttpClient) { }

  uploadFile(file1: File, file2 : File, description : string): Observable<HttpResponse<Object>>{

    const formData : FormData = new FormData();
    formData.append('image', file1);
    formData.append('image-thumb', file2);
    formData.append('description', description);
    console.log(formData.get('image'));
    console.log(formData.get('image-thumb'));
    console.log(formData.get('description'));
   return this.httpClient.post(this.url, formData, {observe : "response", responseType :"text"});
  }

  getWholeGallery() : Observable<Array<GalleryItem>>{

    return this.httpClient.get<Array<GalleryItem>>(this.url + '/images', {observe : 'body', responseType : 'json'});

  }

}
