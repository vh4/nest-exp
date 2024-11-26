import {
  Body,
  Controller,
  Header,
  HttpCode,
  Post,
  Req,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { Connection } from '../connection/connection';
// import { MailService } from '../mail/mail.service';
import { MessageService } from '../../helpers/message/message.service';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { createUserSchema } from 'src/model/create-user.model';
import { Request, Response } from 'express';

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
  // @UseInterceptors(TimeInterceptor)
  @UsePipes(new ValidationPipe(createUserSchema))
  @Post()
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async createController(
    @Body() data: any,
    @Req() req: Request,
  ): Promise<Record<string, any>> {
    const create = await this.UserService.Create(data);

    const response = {
      ...this.message.Success(),
      data: create,
    };

    req.payload.response = response;

    return response;
  }
}
