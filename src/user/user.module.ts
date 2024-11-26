import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {
  Connection,
  MysqlConnection,
  PostgesConnection,
} from './connection/connection';
import { MailService, mailServiceInject } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Connection,
      useClass:
        process.env.DATABASE == 'mysql' ? MysqlConnection : PostgesConnection,
    },
    {
      provide: MailService,
      useValue: mailServiceInject,
    },
    UserRepository,
  ],
  exports: [UserService],
})
export class UserModule {}
