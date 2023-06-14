import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from './config/config';
import { ImageControllerApi } from './config/ImageControllerApi';
import { Image } from './model/Image';
import { Page } from './model/Page';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private url : string = Config.SERVERBASEURL + '/image/gallery';
  private getGalleryByPageUrl : string = Config.SERVERBASEURL + '/image/gallery/page';

  constructor(private httpClient : HttpClient) { }

  public uploadFile(file: File,  description : string): Observable<HttpResponse<Object>>{

    const formData : FormData = new FormData();
    formData.append('image', file);
    formData.append('description', description);
   return this.httpClient.post(this.url, formData, {observe : "response", responseType :"text"});
  }

  public getWholeGallery() : Observable<Array<Image>>{

    return this.httpClient.get<Array<Image>>(this.url + '/images', {observe : 'body', responseType : 'json'});

  }
  public getGalleryByPage(page : number, itemsPerPage : number) : Observable<Page<Image>>{
    let params : HttpParams = new HttpParams()
                .set('page', new String(page).toString())
                .set('itemsPerPage', new String(itemsPerPage).toString());
   
    return this.httpClient.get<Page<Image>>(this.getGalleryByPageUrl, {observe : 'body', responseType : 'json', params : params});


  }

  public deleteImageById(id) : Observable<HttpResponse<Object>>{

    const url = Config.SERVERBASEURL + ImageControllerApi.deleteById + id;
    return this.httpClient.delete(url, {observe : "response", responseType :"text"});

  }

}
