import { Injectable } from '@nestjs/common';
import { User } from '../user.interface';
import { UserRepository } from '../user-repository/user-repository';
import { z } from 'zod';
import { ValidationService } from '../../validation/validation/validation.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly val: ValidationService,
  ) {}
  
  async Create(user: User): Promise<Record<string, any>> {

    const schema = z.object({
      id: z.number().optional(),
      name: z.string().min(1).max(100),
      username: z.string().min(1).max(100),
      token: z.string().optional(),
      email: z.string().email(),
      password: z.string().min(6).max(100),
      picture: z.string().optional(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
    });

    const validator = this.val.validation(schema, user);
    const resp = await this.userRepository.save(validator);
    return resp;
  
  }
}
