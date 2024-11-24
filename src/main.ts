import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const loggerService = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(loggerService);

  app.use(cookieParser());
  app.setBaseViewsDir(__dirname + '/../views');
  app.setViewEngine('hbs');
  hbs.registerPartials(__dirname + '/../views');

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  // Use the proper logging method
  loggerService.log(
    `Application is running on: http://localhost:${PORT}`,
    'info',
  );
  await app.listen(PORT);
}
bootstrap();
