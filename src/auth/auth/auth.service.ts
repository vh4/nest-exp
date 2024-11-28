import { Injectable } from '@nestjs/common';
import { ErrorHandlerCustomService } from 'src/helpers/error-handler-custom/error-handler-custom.service';
import { MessageService } from 'src/helpers/message/message.service';
import { UserRepository } from 'src/user/user-repository/user-repository';
import { AuthLogin, AuthLoginResponse } from '../auth.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly messageService: MessageService,
    private readonly userRepository: UserRepository,
    private readonly errorHandler: ErrorHandlerCustomService,
  ) {}

  async login(request: AuthLogin): Promise<AuthLoginResponse> {
    const user = await this.userRepository.findExistingUser(
      request.username,
      '',
    );
    if (!user) {
      const failedMessage = this.messageService.InvalidMerchant();
      this.errorHandler.throwError(
        401,
        failedMessage.responseCode,
        failedMessage.responseMessage,
      );
    }

    const isPasswordValid = await bcrypt.compare(
      request.password,
      user.password,
    );
    if (!isPasswordValid) {
      const failedMessage = this.messageService.InvalidMerchant();
      this.errorHandler.throwError(
        401,
        failedMessage.responseCode,
        failedMessage.responseMessage,
      );
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '60s',
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '3600s',
    });

    return {
      username: user.username,
      name: user.name,
      email: user.email,
      picture: user.picture,
      accessToken,
      refreshToken,
      expiredIn: 60,
    };
  }
}
