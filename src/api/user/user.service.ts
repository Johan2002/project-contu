import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/data/entities/user/user.entity';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  ICreateUser,
  IUpdateUser,
  IUser,
} from 'src/data/interfaces/api/user/user.interface';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  async create({ roleId, ...createUser }: ICreateUser): Promise<IUser> {
    createUser.userPassword = await bcrypt.hash(createUser.userPassword, 10);

    const { userId }: IUser = await this.userRepository.save({
      role: { roleId },
      ...createUser,
    });

    const user = await this.userRepository.findOne({ where: { userId } });

    delete user.userPassword;

    return user;
  }

  findOneByUserName(userName: string) {
    return this.userRepository.findOne({
      where: { userName },
      relations: ['role', 'role.permission'],
    });
  }

  async findAll(): Promise<Array<IUser>> {
    const user = await this.userRepository.find({
      select: ['userId', 'userName', 'userEmail'],
    });
    return user;
  }

  async findOne(userId: string): Promise<IUser> {
    const user = await this.userRepository.findOne({
      where: { userId },
    });

    delete user.userPassword;

    return user;
  }

  async update(userId: string, updateUser: IUpdateUser): Promise<IUser> {
    const updateResult: UpdateResult = await this.userRepository.update(
      userId,
      { ...updateUser },
    );

    if (!updateResult.affected)
      throw new NotFoundException('User information could not be updated.');

    const user: IUser = await this.userRepository.findOne({
      where: { userId },
    });

    delete user.userPassword;

    return user;
  }

  async remove(userId: string): Promise<string> {
    const deleteResult: DeleteResult = await this.userRepository.delete(userId);

    if (!deleteResult.affected) throw new NotFoundException('User not found.');

    return userId;
  }
}
