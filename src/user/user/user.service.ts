import { ErrorHandlerCustomService } from 'src/helpers/error-handler-custom/error-handler-custom.service';
import { UserRepository } from '../user-repository/user-repository';
import { MessageService } from 'src/helpers/message/message.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly message: MessageService,
    private readonly err:ErrorHandlerCustomService
  ) {}

  async Create(user: User): Promise<Record<string, any>> {
    const isExist = await this.userRepository.findExistingUser(
      user.username,
      user.email,
    );
    if (isExist) {
      const error = this.message.DuplicateTransaction();
      this.err.throwError(
        400,
        error.responseCode,
        error.responseMessage,
      );
    }
    user.password = await bcrypt.hash(user.password, 10);
    const resp = await this.userRepository.save(user);
    return resp;
  }
}
