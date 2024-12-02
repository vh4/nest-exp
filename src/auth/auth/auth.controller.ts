import { Body, Controller, Post, Req, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { AuthLoginSchema } from 'src/model/create-auth.model';
import { AuthLogin } from '../auth.interface';
import { MessageService } from 'src/helpers/message/message.service';
import { Request } from 'express';

@Controller('/api/auth/login')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly message: MessageService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe(AuthLoginSchema))
  async login(
    @Body() dto: AuthLogin,
    @Req() req: Request,
  ): Promise<Record<string, string | number>> {
    const resp = await this.authService.login(dto);
    req.response = resp;
    return {
      ...this.message.Success(),
      ...resp,
    };
  }
}
