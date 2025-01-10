import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  IAuth,
  IPayload,
} from 'src/data/interfaces/api/auth.interface.ts/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login({ userName, userPassword }: IAuth) {
    const user = await this.userService.findOneByUserName(userName);
    if (!user) {
      throw new UnauthorizedException('Please verify credentials.');
    }

    const isPasswordValid = await bcrypt.compare(
      userPassword,
      user.userPassword,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Please verify credentials.');
    }

    const permissions: string[] =
      user?.role?.permission?.map((permission) => permission.permissionName) ||
      [];

    delete user.userPassword;

    const payload: IPayload = {
      ...user,
      permissions,
    };
    console.log('payload :>> ', payload);
    const token = await this.jwtService.signAsync(payload);
    return {
      acces_token: token,
    };
  }
}
