import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BotNotificationEntity } from './entity/bot-notification.entity';
import { In, Repository } from 'typeorm';
import { Token } from 'src/token/entity/token.entity';
import { ContentManagementEntity } from 'src/content-management/entity/content-management.entity';
import { BotNotificationDto } from './dto/bot-notification.dto';

@Injectable()
export class BotNotificationService {
  constructor(
    @InjectRepository(BotNotificationEntity)
    private readonly botRepo: Repository<BotNotificationEntity>,

    @InjectRepository(Token)
    private readonly tokenRepo: Repository<Token>,

    @InjectRepository(ContentManagementEntity)
    private readonly contentRepo: Repository<ContentManagementEntity>,
  ) {}

  async create(dto: BotNotificationDto) {
    const token = await this.tokenRepo.findOneBy({ id: dto.tokenId });
    if (!token) {
      throw new Error('Token not found');
    }

    const contents = await this.contentRepo.findBy({ id: In(dto.contentIds) });

    const botNotification = this.botRepo.create({
      nameBot: dto.nameBot,
      enable: dto.enable,
      token,
      contents,
    });

    return this.botRepo.save(botNotification);
  }

  findAll() {
    return this.botRepo.find();
  }

  async findOne(id: number) {
    const botNotification = await this.botRepo.findOneBy({ id });
    if (!botNotification) {
      throw new Error('Bot Notification not found');
    }
    return botNotification;
  }

  async update(id: number, dto: BotNotificationDto) {
    const botNotification = await this.botRepo.findOneBy({ id });
    if (!botNotification) {
      throw new Error('Bot Notification not found');
    }

    const token = await this.tokenRepo.findOneBy({ id: dto.tokenId });
    if (!token) {
      throw new Error('Token not found');
    }

    const contents = await this.contentRepo.findBy({ id: In(dto.contentIds) });

    Object.assign(botNotification, {
      nameBot: dto.nameBot,
      enable: dto.enable,
      token,
      contents,
    });

    return this.botRepo.save(botNotification);
  }

  async remove(id: number) {
    const botNotification = await this.botRepo.findOneBy({ id });
    if (!botNotification) {
      throw new Error('Bot Notification not found');
    }

    return this.botRepo.remove(botNotification);
  }
}
