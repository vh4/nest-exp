import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, MysqlConnection, PostgesConnection } from './connection/connection';
import { MailService, mailServiceInject } from './mail/mail.service';
import { createUserRepository, UserRepository } from './user-repository/user-repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService, 
    {
      provide:Connection,
      useClass: process.env.DATABASE == 'mysql' ? MysqlConnection : PostgesConnection
    },
    {
      provide:MailService,
      useValue:mailServiceInject
    }, 
    {
      provide:UserRepository,
      useFactory:createUserRepository,
      inject:[Connection] // inject is parameter in class constructor
    }
  ],
})
export class UserModule {}
