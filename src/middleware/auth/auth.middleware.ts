import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorHandlerCustomService } from 'src/helpers/error-handler-custom/error-handler-custom.service';
import { MessageService } from 'src/helpers/message/message.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly err:ErrorHandlerCustomService,
    private readonly message:MessageService,
  ){}
  use(req: Request, res: Response, next: () => void) {
    const fail = this.message.TransactionNotPermittedToTerminal();
    const auth = req.headers.authorization;
    if(!auth || !auth.startsWith('Bearer ')){
      this.err.throwError(
        401,
        fail.responseCode,
        fail.responseMessage
      )
    }
    const token = auth.replace(/^Bearer\s+/i, '');
    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = payload as jwt.JwtPayload;
    } catch (error) {
      this.err.throwError(
        401,
        fail.responseCode,
        fail.responseMessage
      )
    }

    next();
  }
}
