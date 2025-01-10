import { IRole } from '../role/role.interface';

export interface IPermission {
  permissionId: string;
  permissionName: string;
  role: Array<IRole>;
}

export type ICreatePermission = Omit<IPermission, 'permissionId'>;
