import { DynamicModule, Module } from '@nestjs/common';
import { ValidationService } from './validation/validation.service';

@Module({})
export class ValidationModule {
  static forRoot(data: { isGlobal: boolean }): DynamicModule {
    return {
      global: data.isGlobal,
      module: ValidationModule,
      providers: [ValidationService],
      exports: [ValidationService],
    };
  }
}
