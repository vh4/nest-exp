import { Test, TestingModule } from '@nestjs/testing';
import { MidService } from './mid.service';

describe('MidService', () => {
  let service: MidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MidService],
    }).compile();

    service = module.get<MidService>(MidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be valid mid', () => {
    expect(service.MessageIdentifier().length).toBe(19);
  });
});
