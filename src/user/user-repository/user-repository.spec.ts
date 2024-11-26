import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user-repository';
import { PrismaService } from '../../prisma/prisma/prisma.service'; // Adjusted for relative path

describe('UserRepository', () => {
  let provider: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository, PrismaService],
    }).compile();

    provider = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
