import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(8000);
}
bootstrap();
