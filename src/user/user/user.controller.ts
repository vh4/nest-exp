import { Body, Controller, Header, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
// import { Connection } from '../connection/connection';
// import { MailService } from '../mail/mail.service';
import { MessageService } from '../../helpers/message/message.service';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { createUserSchema } from 'src/model/create-user.model';

@Controller('/api/user')
export class UserController {
  // @Inject()
  // private UserService:UserService;
  // @Inject(Connection)
  // private readonly connection: Connection;

  constructor(
    private UserService: UserService,
    private message: MessageService,
    // private connection: Connection,
    // private mailserviceinject: MailService,
  ) {}

  //create for users
  @Post()
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async createController(
    @Body(new ValidationPipe(createUserSchema)) data: any,
  ): Promise<Record<string, any>> {
    const response = await this.UserService.Create(data);
    return {
      ...this.message.Success(),
      data: response,
    };
  }
}
