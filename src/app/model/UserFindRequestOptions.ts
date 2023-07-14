import { Page } from "./Page";
import { User } from "./User";

export class UserFindRequestOptions{

    user : User;
    page : Page<User>;
}