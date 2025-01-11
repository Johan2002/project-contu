import { IUser } from '../user/user.interface';

export interface IAuth {
  userName: string;
  userPassword: string;
}

export interface IAuthenticatedUser {
  token: string;
}

export interface IJwtToken extends Omit<IUser, 'userPassword'> {
  permissions: Array<string>;
}
