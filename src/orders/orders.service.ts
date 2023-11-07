import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  async create(createOrderDto: CreateOrderDto[]) {
    try {
      return await this.prismaService.orders.createMany({
        data: createOrderDto,
      });
    } catch (e) {
      throw new RpcException(new ConflictException('Product was duplicate'));
    }
  }

  async findAll(options: any) {
    try {
      const datas = await this.prismaService.orders.findMany({
        skip: (options.pageNumber - 1) * parseInt(options.pageSize), // Menghitung berapa data yang harus dilewati (skip)
        take: parseInt(options.pageSize), // Mengambil jumlah data sebanyak yang diinginkan (limit)
      });
      const count = await this.prismaService.orders.count();
      return {
        data: datas,
        totalData: count,
        limit: options.pageSize,
        currentPage: options.pageNumber,
      };
    } catch (e) {
      throw new RpcException(new ConflictException('There was problem'));
    }
  }

  async findOne(id: string) {
    try {
      const datas = await this.prismaService.orders.findUnique({
        where: {
          kode: id,
        },
        select: {
          part_no: true,
          part_name: true,
        },
      });
      if (!datas) {
        throw new RpcException(new BadRequestException('Data Not Found'));
      }
      return datas;
    } catch (e) {
      throw new RpcException(new ConflictException('There was problem'));
    }
  }
  async remove(id: string) {
    try {
      return await this.prismaService.orders.delete({
        where: {
          kode: id,
        },
      });
    } catch (e) {
      throw new RpcException(new ConflictException('There was problem'));
    }
  }
}
