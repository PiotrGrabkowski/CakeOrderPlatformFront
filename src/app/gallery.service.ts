import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from './config/config';
import { Image } from './model/Image';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private url : string = Config.SERVERBASEURL + '/image/gallery';

  constructor(private httpClient : HttpClient) { }

  uploadFile(file: File,  description : string): Observable<HttpResponse<Object>>{

    const formData : FormData = new FormData();
    formData.append('image', file);
    formData.append('description', description);
   return this.httpClient.post(this.url, formData, {observe : "response", responseType :"text"});
  }

  getWholeGallery() : Observable<Array<Image>>{

    return this.httpClient.get<Array<Image>>(this.url + '/images', {observe : 'body', responseType : 'json'});

  }

}
