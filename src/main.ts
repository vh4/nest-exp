import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser()); 
  app.setBaseViewsDir(__dirname + '/../views');
  app.setViewEngine('hbs'); 
  hbs.registerPartials(__dirname + '/../views'); 

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT') ?? 5000);
  
}
bootstrap();
