import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/data/guards/auth.guard';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, AuthModule, JwtModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesAndPermissionsGuard,
    // },
  ],
})
export class ApiModule {}
