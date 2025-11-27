import { Module } from '@nestjs/common';
import { BotNotificationService } from './bot-notification.service';
import { BotNotificationController } from './bot-notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotNotificationEntity } from './entity/bot-notification.entity';
import { Token } from 'src/token/entity/token.entity';
import { ContentManagementEntity } from 'src/content-management/entity/content-management.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BotNotificationEntity,
      Token,
      ContentManagementEntity,
    ]),
  ],
  providers: [BotNotificationService],
  controllers: [BotNotificationController],
  exports: [BotNotificationService],
})
export class BotNotificationModule {}
