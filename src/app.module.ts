import { Module } from '@nestjs/common';
import { TypeOrmConfigAsync } from './data/config-database/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './data/interceptor/catch/error.interceptor';
import { ResponseInterceptor } from './data/interceptor/response/response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'common/develop.env',
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigAsync),
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
  ],
})
export class AppModule {}
