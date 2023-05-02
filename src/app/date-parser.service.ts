import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateParserService {

  constructor() { }

  public parseFromIsoLocalDateTime(localDateTime : string): string{

    let date = localDateTime.split('T')[0];
    let time = localDateTime.split('T')[1].split('.')[0];

    return date +' '+time;

  }

}
