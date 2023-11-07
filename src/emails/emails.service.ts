import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { PrismaService } from 'nestjs-prisma';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class EmailsService {
  constructor(private prismaService: PrismaService) {}

  async create(createEmailDto: CreateEmailDto) {
    try {
      const isThere = await this.prismaService.emails.findFirst({
        where: {
          email: createEmailDto.email,
        },
      });
      if (isThere) {
        throw new RpcException(new ConflictException('Email already exists'));
      }
      return this.prismaService.emails.createMany({
        data: createEmailDto,
      });
    } catch (e) {
      throw new RpcException(new ConflictException('Email was duplicate'));
    }
  }

  findAll() {
    return this.prismaService.emails.findMany();
  }

  remove(id: number) {
    return this.prismaService.emails.delete({
      where: {
        id,
      },
    });
  }
}
