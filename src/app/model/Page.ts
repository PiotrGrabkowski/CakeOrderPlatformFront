export class Page<T>{
    currentPage : number; // counting starts from number 1
    offset : number;
    itemsPerPage : number;
    numberOfPages : number;
    totalNumberOfItems : number;
    listOfItems : Array<T>;

}