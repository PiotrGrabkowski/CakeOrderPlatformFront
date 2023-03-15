import { JsonMultipartFile } from "./JsonMultipartFile";

export class OrderRequest{
    phoneNumber : number;
    eventDate : string;
    typeOfProduct : string;
    numberOfServings: string;
    listOfTastes : Array<string>;
    description : string;
    pictureExample : string;
    jsonMultipartFile : JsonMultipartFile;
    

}