import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { User, UserSelect } from '../user.interface';

@Injectable()
export class UserRepository {
  constructor(private db: PrismaService) {}
  async save(user: User): Promise<User> {
    return this.db.users.create({
      data: user,
    }); //
  }
  async findExistingUser(username: string, email: string): Promise<User> {
    return this.db.users.findFirst({
      where: {
        OR: [
          {
            username: username,
          },
          {
            email: email,
          },
        ],
      },
    });
  }
}
