import { Injectable } from '@nestjs/common';
import { User } from '../user.interface';
import { UserRepository } from '../user-repository/user-repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async Create(user: User): Promise<Record<string, any>> {
    const resp = await this.userRepository.save(user);
    return resp;
  }
}
