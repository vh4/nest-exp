import { Test, TestingModule } from '@nestjs/testing';
import { ErrorHandlerCustomService } from './error-handler-custom.service';

describe('ErrorHandlerCustomService', () => {
  let service: ErrorHandlerCustomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorHandlerCustomService],
    }).compile();

    service = module.get<ErrorHandlerCustomService>(ErrorHandlerCustomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
