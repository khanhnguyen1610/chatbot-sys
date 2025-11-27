import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TelegramGroup } from './entity/telegram-group.entity';
import { Repository } from 'typeorm';
import { createTelegramGroupDto } from './dto/telegram-group.dto';
import { SearchTelegramGroupDto } from './dto/search-telegram-group.dto';
import { PaginationResponseDto } from 'src/common/pagination/paginationResponse.dto';

@Injectable()
export class TelegramGroupService {
  constructor(
    @InjectRepository(TelegramGroup)
    private readonly telegramGroupRepo: Repository<TelegramGroup>,
  ) {}

  create(dto: createTelegramGroupDto) {
    const group = this.telegramGroupRepo.create(dto);
    return this.telegramGroupRepo.save(group);
  }

  findAll() {
    return this.telegramGroupRepo.find();
  }

  async search(query: SearchTelegramGroupDto) {
    const {
      nameChannelOrGroup,
      channelOrGroupId,
      page = 1,
      perPage = 10,
      sortBy = 'id',
      sortOrder = 'DESC',
    } = query;

    const qb = this.telegramGroupRepo.createQueryBuilder('group');

    if (nameChannelOrGroup) {
      qb.andWhere('group.nameChannelOrGroup = :nameChannelOrGroup', {
        nameChannelOrGroup,
      });
    }

    if (channelOrGroupId) {
      qb.andWhere('group.channelOrGroupId = :channelOrGroupId', {
        channelOrGroupId,
      });
    }

    qb.orderBy(`group.${sortBy}`, sortOrder);

    qb.skip((page - 1) * perPage).take(perPage);

    const [items, total] = await qb.getManyAndCount();

    return new PaginationResponseDto(items, total, page, perPage);
  }

  async findOne(id: number) {
    const group = await this.telegramGroupRepo.findOne({ where: { id } });
    if (!group) {
      throw new Error('Telegram Group not found');
    }
    return group;
  }

  async update(id: number, dto: createTelegramGroupDto) {
    const group = await this.findOne(id);
    Object.assign(group, dto);
    return this.telegramGroupRepo.save(group);
  }

  async remove(id: number) {
    const group = await this.findOne(id);
    return this.telegramGroupRepo.remove(group);
  }
}
