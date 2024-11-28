import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from '../user-repository/user-repository';
import { MessageService } from 'src/helpers/message/message.service';
import { ErrorHandlerCustomService } from 'src/helpers/error-handler-custom/error-handler-custom.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [UserController],
      providers: [
        UserService,
        UserRepository,
        MessageService,
        ErrorHandlerCustomService,
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
