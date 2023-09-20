import { Module } from '@nestjs/common';
import { EpubsController } from './epubs.controller';
import { EpubsService } from './epubs.service';

@Module({
  controllers: [EpubsController],
  providers: [EpubsService],
})
export class EpubsModule {}
