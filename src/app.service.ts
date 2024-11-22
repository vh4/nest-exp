import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthy(id:string): Record<string, any> {
    return {
      id:id ? id : '-',
      response_code: '00',
      response_message: 'Success',
      status: '/_healthy',
    };
  }
}
