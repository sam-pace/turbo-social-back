import { Module } from '@nestjs/common';
import { TurboMarketService } from 'src/services/turbo-market.service';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TurboMarketService],
  exports: [TurboMarketService],
})
export class TurboMarketModule {}
