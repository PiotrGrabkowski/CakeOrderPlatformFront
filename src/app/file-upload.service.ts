import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private url : string = 'http://localhost:8080/image/gallery';

  constructor(private httpClient : HttpClient) { }

  uploadFile(file1: File, file2 : File): Observable<HttpResponse<Object>>{

    const formData : FormData = new FormData();
    formData.append('image', file1);
    formData.append('image-thumb', file2);
    console.log(formData.get('image'));
    console.log(formData.get('image-thumb'));
   return this.httpClient.post(this.url, formData, {observe : "response", responseType :"text"});
  }
}
