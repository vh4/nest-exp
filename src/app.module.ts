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
import { SuccessInterceptor } from './interceptor/success/success.interceptor';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth/auth.middleware';
import { MidMiddleware } from './middleware/mid/mid.middleware';

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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //mid for initial identifier
    consumer
      .apply(MidMiddleware)
      .forRoutes({
        path: '/api/*',
        method: RequestMethod.ALL,
      });

    // Apply LogMiddleware to all routes under `/api/*`
    consumer
      .apply(LogMiddleware)
      .forRoutes({
        path: '/api/*',
        method: RequestMethod.ALL,
      });

    // Apply AuthMiddleware only to specific routes
    consumer
      .apply(AuthMiddleware)
      .forRoutes({
        path: '/api/user/*',
        method: RequestMethod.ALL,
      });
  }
}
