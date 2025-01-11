import { Module } from '@nestjs/common';
import { TypeOrmConfigAsync } from './data/config-database/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './data/interceptor/catch/error.interceptor';
import { ResponseInterceptor } from './data/interceptor/response/response.interceptor';
import { ApiModule } from './api/api.module';
import { JwtModule } from '@nestjs/jwt';
import { LoggingInterceptor } from './data/interceptor/catch/routes.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'common/develop.env',
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigAsync),
    ApiModule,
    JwtModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
