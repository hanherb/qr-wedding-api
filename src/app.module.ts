import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenerateModule } from './modules/generate/generate.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from './config/db';
import { APP_FILTER } from '@nestjs/core';
import { ResponseErrorInterceptor } from './interceptor/response.error.interceptor';
import { CheckInModule } from './modules/check_in/check_in.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [database] }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('db_config'),
      inject: [ConfigService],
    }),
    GenerateModule,
    CheckInModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ResponseErrorInterceptor
    }
  ],
})
export class AppModule {}
