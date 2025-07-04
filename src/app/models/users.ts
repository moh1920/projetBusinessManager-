import {RoleUser} from "./RoleUser";

export interface Users {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  roleUser: RoleUser;
}
