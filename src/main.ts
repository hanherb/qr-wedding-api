import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseErrorInterceptor } from './interceptor/response.error.interceptor';
import { ResponseSuccessInterceptor } from './interceptor/response.success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  app.useGlobalFilters(new ResponseErrorInterceptor())
  app.useGlobalInterceptors(new ResponseSuccessInterceptor())
  await app.listen(3000);
}
bootstrap();
