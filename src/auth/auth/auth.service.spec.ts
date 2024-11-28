import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MessageService } from 'src/helpers/message/message.service';
import { UserRepository } from 'src/user/user-repository/user-repository';
import { ErrorHandlerCustomService } from 'src/helpers/error-handler-custom/error-handler-custom.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        MessageService,
        UserRepository,
        ErrorHandlerCustomService,
        PrismaService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
