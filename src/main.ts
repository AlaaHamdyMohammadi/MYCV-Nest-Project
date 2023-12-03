import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['al26aa']
  }));
  app.useGlobalPipes(
    new ValidationPipe({
      // The purpose to make sure that incoming requests don't have extraneous properties in the body that we are not expecting(small security thing)
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
