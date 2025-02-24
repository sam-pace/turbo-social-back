import { Injectable } from '@nestjs/common';
import { CreateTurboMarketInput } from '@dtos/create-turbo-market.input';
import { UpdateTurboMarketInput } from '@dtos/update-turbo-market.input';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class TurboMarketService {
  constructor(private prisma: PrismaService) {}

  create(createTurboMarketInput: CreateTurboMarketInput) {
    return this.prisma.turboMarket.create({ data: createTurboMarketInput });
  }

  findAll() {
    return this.prisma.turboMarket.findMany({
      include: {
        user: {
          select: { username: true, avatarUrl: true },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.turboMarket.findUnique({
      where: { id: id },
      include: {
        user: {
          select: { username: true, avatarUrl: true },
        },
      },
    });
  }

  update(id: string, updateTurboMarketInput: UpdateTurboMarketInput) {
    return this.prisma.turboMarket.update({
      where: { id: id },
      data: updateTurboMarketInput,
    });
  }

  remove(id: string) {
    return this.prisma.turboMarket.delete({ where: { id: id } });
  }
}
