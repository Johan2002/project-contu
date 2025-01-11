import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {
  IAuth,
  IAuthenticatedUser,
  IJwtToken,
} from 'src/data/interfaces/api/auth/auth.interface';
import { IUser } from 'src/data/interfaces/api/user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login({ userName, userPassword }: IAuth): Promise<IAuthenticatedUser> {
    const user: IUser = await this.userService.findOneByUserName(userName);
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

    delete user.userPassword;

    const payload: IJwtToken = {
      ...user,
      permissions: user?.role?.permission?.map((permission) => {
        return permission.permissionName;
      }),
    };

    delete payload.role.permission;

    console.log('payload :>> ', payload);
    const token = await this.jwtService.signAsync(payload);
    return {
      token: token,
    };
  }
}
