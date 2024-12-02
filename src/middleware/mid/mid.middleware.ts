import { Injectable, NestMiddleware } from '@nestjs/common';
import { MidService } from '../../helpers/mid/mid.service';
import { Request } from 'express';
import 'express';

@Injectable()
export class MidMiddleware implements NestMiddleware {
  constructor(
    private readonly mid:MidService
  ){}
  use(req: Request, res: any, next: () => void) {
    req['mid']= this.mid.MessageIdentifier();
    next();
  }
  
}
