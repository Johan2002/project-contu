import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Role } from 'src/data/entities/role/role.entity';
import {
  ICreateRole,
  IRole,
  IUpdateRole,
} from 'src/data/interfaces/api/role/role.interface';

@Injectable()
export class RoleService {
  @InjectRepository(Role)
  private readonly roleRepository: Repository<Role>;

  async create({ ...createRole }: ICreateRole): Promise<IRole> {
    const { roleId }: IRole = await this.roleRepository.save({
      ...createRole,
    });

    const role = await this.roleRepository.findOne({ where: { roleId } });

    return role;
  }

  async findAll(): Promise<Array<IRole>> {
    return await this.roleRepository.find();
  }

  async findOne(roleId: string): Promise<IRole> {
    const role = await this.roleRepository.findOne({
      where: { roleId },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async update(roleId: string, updateRole: IUpdateRole): Promise<IRole> {
    const updateResult: UpdateResult = await this.roleRepository.update(
      roleId,
      {
        ...updateRole,
      },
    );

    if (!updateResult)
      throw new NotFoundException('Rol information could not be updated.');

    const role: IRole = await this.roleRepository.findOne({
      where: { roleId },
    });

    return role;
  }
}
