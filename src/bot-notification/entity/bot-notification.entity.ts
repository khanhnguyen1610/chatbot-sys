import { ContentManagementEntity } from 'src/content-management/entity/content-management.entity';
import { Token } from 'src/token/entity/token.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('bot_notification')
export class BotNotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  nameBot: string;

  @Column({ default: true })
  enable: boolean;

  @ManyToOne(() => Token, (token) => token.botNotifications, {
    eager: true,
    onDelete: 'CASCADE',
  })
  token: Token;

  @ManyToMany(
    () => ContentManagementEntity,
    (content) => content.botNotifications,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinTable()
  contents: ContentManagementEntity[];
}
