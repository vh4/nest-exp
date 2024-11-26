import { Injectable } from '@nestjs/common';
import { User } from '../user.interface';
import { UserRepository } from '../user-repository/user-repository';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async Create(user: User): Promise<Record<string, any>> {
    user.password = await bcrypt.hash(user.password, 10);
    const resp = await this.userRepository.save(user);
    return resp;
  }
}
