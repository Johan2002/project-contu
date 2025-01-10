import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/data/guards/auth.guard';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { PermissionsGuard } from 'src/data/guards/permission.guard';

@Module({
  imports: [
    UserModule,
    AuthModule,
    JwtModule,
    RoleModule,
    PermissionModule,
    ProductModule,
    CustomerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class ApiModule {}
