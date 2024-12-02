import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from 'winston';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const mid = req.mid;
    return next.handle().pipe(
      tap(() => {
        this.logger.warn(
          `success / ${mid} / request  -> ${JSON.stringify(req.body)}`,
        );
        this.logger.warn(
          `success / ${mid} / response -> ${JSON.stringify(req.response) ?? '-'}`,
        );
      }),
    );
  }
}
