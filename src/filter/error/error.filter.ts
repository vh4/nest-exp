import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpStatus,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CustomError } from 'src/helpers/error-handler-custom/error-handler-custom.service';
import { MessageService } from 'src/helpers/message/message.service';
import { Logger } from 'winston';
import { ZodError } from 'zod';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  constructor(
    private readonly message: MessageService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const res = http.getResponse<Response>();
    const req = http.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseMessage: object;

    if (exception instanceof CustomError) {
      statusCode = exception.status;
      responseMessage = {
        responseCode: exception.response_code,
        responseMessage: exception.response_message,
      };
    } else if (exception instanceof ZodError) {
      statusCode = HttpStatus.BAD_REQUEST;
      responseMessage = this.message.FormatError();
    } else if (exception instanceof TypeError) {
      statusCode = HttpStatus.BAD_REQUEST;
      responseMessage = this.message.FormatError();
     }else if(exception instanceof ForbiddenException){
      statusCode = HttpStatus.FORBIDDEN;
      responseMessage = this.message.TransactionNotPermittedToTerminal();
    } else if (exception instanceof Error) { //paling akhir urutanya agar exeption lain ke handle
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseMessage = this.message.SystemMalfunction();
    }  else { //paling akhir urutanya agar exeption lain ke handle
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR; 
      responseMessage = this.message.SystemMalfunction();
    }

    this.logger.error(
      `request   / ${req.mid} -> header -> ${JSON.stringify(req.headers)} body -> ${JSON.stringify(req.body)}`,
    );
    this.logger.error(`error     / ${req.mid} -> ${exception.message}`);
    this.logger.error(
      `response  / ${req.mid} -> ${JSON.stringify(req.response ?? '-')}`,
    );

    res.status(statusCode).json({
      ...responseMessage,
      ...req.body,
      timestamp: req.timestamp,
    });
  }
}
