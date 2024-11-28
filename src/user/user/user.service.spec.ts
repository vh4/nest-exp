import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../user-repository/user-repository';
import { MessageService } from 'src/helpers/message/message.service';
import { ErrorHandlerCustomService } from 'src/helpers/error-handler-custom/error-handler-custom.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [UserService, UserRepository, MessageService, ErrorHandlerCustomService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
