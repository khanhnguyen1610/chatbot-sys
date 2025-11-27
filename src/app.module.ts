import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/orm.config';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { TelegramGroupModule } from './telegram-group/telegram-group.module';
import { ContentManagementModule } from './content-management/content-management.module';
import { BotNotificationModule } from './bot-notification/bot-notification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    TokenModule,
    TelegramGroupModule,
    ContentManagementModule,
    BotNotificationModule,
  ],
})
export class AppModule {}
