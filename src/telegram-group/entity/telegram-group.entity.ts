import { ContentManagementEntity } from 'src/content-management/entity/content-management.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('telegram_group')
export class TelegramGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nameChannelOrGroup: string;

  @Column({ unique: true })
  channelOrGroupId: string;

  @Column({ type: 'int', default: 0 })
  countTime: number;

  @ManyToMany(
    () => ContentManagementEntity,
    (content) => content.telegramGroups,
  )
  contents: ContentManagementEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
