import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentManagementEntity } from './entity/content-management.entity';
import { In, Repository } from 'typeorm';
import { TelegramGroup } from 'src/telegram-group/entity/telegram-group.entity';
import { createContentManagementDto } from './dto/content-management.dto';

@Injectable()
export class ContentManagementService {
  constructor(
    @InjectRepository(ContentManagementEntity)
    private readonly contentRepo: Repository<ContentManagementEntity>,

    @InjectRepository(TelegramGroup)
    private readonly telegramGroupRepo: Repository<TelegramGroup>,
  ) {}

  async create(dto: createContentManagementDto) {
    const group = this.telegramGroupRepo.find({
      where: { id: In(dto.telegramGroupIds) },
    });

    const content = this.contentRepo.create({
      ...dto,
      telegramGroups: await group,
    });

    return this.contentRepo.save(content);
  }

  findAll() {
    return this.contentRepo.find({ relations: ['telegramGroups'] });
  }

  async findOne(id: number) {
    const content = await this.contentRepo.findOne({
      where: { id },
      relations: ['telegramGroups'],
    });
    if (!content) {
      throw new Error('Content not found');
    }
    return content;
  }

  async update(id: number, dto: createContentManagementDto) {
    const content = await this.findOne(id);

    const groups = this.telegramGroupRepo.find({
      where: { id: In(dto.telegramGroupIds) },
    });

    Object.assign(content, dto);
    content.telegramGroups = await groups;

    return this.contentRepo.save(content);
  }

  async remove(id: number) {
    const content = await this.findOne(id);
    return this.contentRepo.remove(content);
  }
}
