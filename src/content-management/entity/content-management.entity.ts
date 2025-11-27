import { BotNotificationEntity } from 'src/bot-notification/entity/bot-notification.entity';
import { TelegramGroup } from 'src/telegram-group/entity/telegram-group.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('content_management')
export class ContentManagementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column('text', { array: true })
  time: string[];

  @ManyToMany(() => TelegramGroup, (group) => group.contents, { cascade: true })
  @JoinTable()
  telegramGroups: TelegramGroup[];

  @ManyToMany(() => BotNotificationEntity, (bot) => bot.contents)
  botNotifications: BotNotificationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
