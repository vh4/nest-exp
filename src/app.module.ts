import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { WinstonModule } from 'nest-winston';
import { ValidationModule } from './validation/validation.module';
import { HelpersModule } from './helpers/helpers.module';
import * as winston from 'winston';
import * as moment from 'moment';
import { LogMiddleware } from './middleware/log/log.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorFilter } from './filter/error/error.filter';
import { TimeInterceptor } from './interceptor/time/time.interceptor';
import { MidInterceptor } from './interceptor/mid/mid.interceptor';
import { SuccessInterceptor } from './interceptor/success/success.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ValidationModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ level, message }) => {
              return `[Nest] ${process.pid}  - ${moment().format('DD/MM/YYYY HH:mm:ss.SSS')}    ${level} => ${message}`;
            }),
          ),
        }),
      ],
    }),
    UserModule,
    PrismaModule,
    ValidationModule,
    HelpersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER, //global filter
      useClass: ErrorFilter,
    },{
      provide: APP_INTERCEPTOR, //global interceptor
      useClass: TimeInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MidInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessInterceptor,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes({
      path: '/api/*',
      method: RequestMethod.ALL,
    });
  }
}
