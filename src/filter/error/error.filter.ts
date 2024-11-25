import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import e, { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
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

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseMessage = this.message.SystemMalfunction();

    if (exception instanceof ZodError) {
      statusCode = HttpStatus.BAD_REQUEST;
      responseMessage = this.message.FormatError();
    } else if (exception instanceof TypeError) {
      statusCode = HttpStatus.BAD_REQUEST;
      responseMessage = this.message.FormatError();
    } else if (exception instanceof Error) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseMessage = this.message.SystemMalfunction();
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseMessage = this.message.SystemMalfunction();
    }

    this.logger.error(`ERROR -> ${exception.message}`);
    res.status(statusCode).json(responseMessage);
  }
}
