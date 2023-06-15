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
  public parseFromDateToLocalDateString(date : Date): string{
    

    // return date.toISOString().split("T")[0];
    let year = date.getFullYear();
    let month = (date.getMonth()+1) + '';
    if(month.length <2){

     month = '0' + month;
    }
    let day = date.getDate() + '';
    if(day.length <2){

     day = '0' + day;
    }
    

    return year + '-' + month + '-' + day;
     
  
   
 }

}
