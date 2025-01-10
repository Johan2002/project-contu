import { IRole } from '../role/role.interface';

export interface IUser {
  userId: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  role: IRole;
}

export type ICreateUser = Pick<
  IUser,
  'userName' | 'userEmail' | 'userPassword'
> &
  Partial<Pick<IRole, 'roleId'>>;

export type IUpdateUser = Partial<ICreateUser>;
