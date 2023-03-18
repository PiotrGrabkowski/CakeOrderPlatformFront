import { Image } from "./Image";
import { User } from "./User";

export class Order{

    id : number;
    user : User;
    phoneNumber : number;
    eventDate : string;
    typeOfProduct : string;
    numberOfServings : string;
    setOfTastes: Array<string>;
    description : string;
    image : Image;
    orderStatus : string;
    creationDate : string;
 
}