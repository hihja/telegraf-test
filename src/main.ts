import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks()
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')
  app.enableCors()

  await app.listen(5000);
}
bootstrap();
