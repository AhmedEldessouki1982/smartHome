import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateQuoteDto) {
    return this.prisma.quote.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        message: dto.message,
        items: dto.items as unknown as Prisma.InputJsonValue,
      },
    });
  }

  findAll() {
    return this.prisma.quote.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.quote.findUnique({ where: { id } });
  }

  updateStatus(id: string, status: 'PENDING' | 'CONTACTED' | 'CLOSED') {
    return this.prisma.quote.update({
      where: { id },
      data: { status },
    });
  }

  remove(id: string) {
    return this.prisma.quote.delete({ where: { id } });
  }
}
