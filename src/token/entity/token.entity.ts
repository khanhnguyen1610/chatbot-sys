import { BotNotificationEntity } from 'src/bot-notification/entity/bot-notification.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('token')
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @OneToMany(() => BotNotificationEntity, (bot) => bot.token)
  botNotifications: BotNotificationEntity[];
}
