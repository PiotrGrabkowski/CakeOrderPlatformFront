import { User } from "./User";

export class PasswordChangeRequest{
    
    userDTO : User;
    oldPassword : string;
    newPassword : string;

}