import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class DashboardService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    try {
      const today = new Date();

      const response = [];
      // Membuat objek untuk setiap bulan dalam format yang diinginkan
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() - i);

        // Format tanggal menjadi "MM-DD"
        const formattedDate = currentDate.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
        });

        // Menghitung jumlah data dalam rentang waktu yang sesuai
        const statDay = await this.prismaService.history.count({
          where: {
            timestamp: {
              gte: currentDate.toISOString(),
              lte: new Date(
                currentDate.getTime() + 24 * 60 * 60 * 1000,
              ).toISOString(), // Tambah 1 hari untuk rentang 24 jam
            },
          },
        });

        response.push({
          Date: formattedDate,
          total: statDay,
        });
      }

      // Menghitung jumlah data dengan status "BERHASIL"
      const jumlahBerhasil = await this.prismaService.history.count({
        where: {
          status: 'BERHASIL',
        },
      });

      // Menghitung jumlah data dengan status "GAGAL"
      const jumlahGagal = await this.prismaService.history.count({
        where: {
          status: 'GAGAL',
        },
      });
      return {
        successRate: [
          {
            status: 'GAGAL',
            total: jumlahGagal,
          },
          {
            status: 'BERHASIL',
            total: jumlahBerhasil,
          },
        ],
        dayStat: response,
      };
    } catch (e) {
      throw new RpcException(new ConflictException('There was problem'));
    }
  }
}
