import { Module } from '@nestjs/common';
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
  providers: [AppService],
})
export class AppModule {}
