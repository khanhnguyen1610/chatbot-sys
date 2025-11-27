import { Module } from '@nestjs/common';
import { ContentManagementService } from './content-management.service';
import { ContentManagementController } from './content-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentManagementEntity } from './entity/content-management.entity';
import { TelegramGroup } from 'src/telegram-group/entity/telegram-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentManagementEntity, TelegramGroup])],
  providers: [ContentManagementService],
  controllers: [ContentManagementController],
})
export class ContentManagementModule {}
