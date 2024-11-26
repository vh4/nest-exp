import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { MidService } from '../../helpers/mid/mid.service';

@Injectable()
export class MidInterceptor implements NestInterceptor {
  constructor(
    private readonly mid:MidService
  ){}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    request.payload.mid = this.mid.MessageIdentifier();
    return next.handle();
  }
}
