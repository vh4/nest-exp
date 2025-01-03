import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { Connection } from '../connection/connection';
// import { MailService } from '../mail/mail.service';
import { MessageService } from '../../helpers/message/message.service';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { createUserSchema } from 'src/model/create-user.model';
import { Request } from 'express';
import { User } from '../user.interface';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/decorator/auth/auth.decorator';

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

    req.response = response;

    return response;
  }

  @Get()
  @HttpCode(200)
  @UseGuards(RoleGuard)
  @Roles('admin')
  @Header('Content-Type', 'application/json')
  async All(@Req() req:Request): Promise<Record<string, string|User[]>>{
    const response = await this.UserService.getAllData();
    req.response = response;
    return {
      ...this.message.Success(),
      data:response
    }
  }
}
