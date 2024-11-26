import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
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
    let responseMessage:object;

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
    } else if (exception instanceof Error) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseMessage = this.message.SystemMalfunction();
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseMessage = this.message.SystemMalfunction();
    }

    this.logger.error(
      `request   / ${req.payload.mid} -> ${JSON.stringify(req.body)}`,
    );
    this.logger.error(`error     / ${req.payload.mid} -> ${exception.message}`);
    this.logger.error(
      `response  / ${req.payload.mid} -> ${JSON.stringify(req.payload?.response ?? '-')}`,
    );

    res.status(statusCode).json({
      ...responseMessage,
      ...req.body,
      timestamp: req.payload?.timestamp,
    });
  }
}
