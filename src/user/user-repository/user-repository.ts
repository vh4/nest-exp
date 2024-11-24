import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { User } from '../user.interface';

@Injectable()
export class UserRepository {
  constructor(private db: PrismaService) {}
  async save(user: User): Promise<User> {
    return await this.db.users.create({
      data: user,
    });
  }
}
