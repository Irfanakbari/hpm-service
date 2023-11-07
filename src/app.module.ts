import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from 'nestjs-prisma';
import { HistoriesModule } from './histories/histories.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EmailsModule } from './emails/emails.module';

@Module({
  imports: [
    OrdersModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    HistoriesModule,
    DashboardModule,
    EmailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
