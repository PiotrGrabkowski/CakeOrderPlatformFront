import { Order } from "./Order";
import { OrderFilterOptions } from "./OrderFilterOptions";
import { Page } from "./Page";
import { Sort } from "./Sort";

export class OrderFindRequestOptions {
    orderFilterOptions : OrderFilterOptions;
    sort: Sort;
    page : Page<Order>;
}