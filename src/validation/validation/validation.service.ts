import { Injectable } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ValidationService {
  validation<T>(schema: ZodType, data: T): T {
    return schema.parse(data);
  }
}
