import { Module } from '@nestjs/common';
import { TelegramGroupService } from './telegram-group.service';
import { TelegramGroupController } from './telegram-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramGroup } from './entity/telegram-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TelegramGroup])],
  providers: [TelegramGroupService],
  controllers: [TelegramGroupController],
})
export class TelegramGroupModule {}
