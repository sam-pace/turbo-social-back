import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/dtos/create-user.input';
import { PrismaService } from './prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserInput } from 'src/dtos/update-user.input';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async registerMany(data: CreateUserInput[]): Promise<User[]> {
    return this.prisma.user
      .createMany({
        data,
        skipDuplicates: true,
      })
      .then(() => this.prisma.user.findMany());
  }
  
  async findAll() {
    return this.prisma.user.findMany();
  }

  async create(data: CreateUserInput) {
    return this.prisma.user.create({ data });
  }
  update(id: string, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id: id },
      data: updateUserInput,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

}
