import { IPermission } from '../permission/permission.interface';
import { IUser } from '../user/user.interface';

export interface IRole {
  roleId: string;
  roleName: string;
  roleDescription: string;
  roleStatus: boolean;
  user: Array<IUser>;
  permission: Array<IPermission>;
}

export type ICreateRole = Pick<
  IRole,
  'roleName' | 'roleDescription' | 'roleStatus'
>;

export type IUpdateRole = Partial<ICreateRole>;
