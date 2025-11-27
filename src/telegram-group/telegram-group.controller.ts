import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TelegramGroupService } from './telegram-group.service';
import { createTelegramGroupDto } from './dto/telegram-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchTelegramGroupDto } from './dto/search-telegram-group.dto';

@ApiTags('Telegram Group')
@Controller('telegram-group')
@UseGuards(JwtAuthGuard)
export class TelegramGroupController {
  constructor(private readonly service: TelegramGroupService) {}

  @Post()
  create(@Body() dto: createTelegramGroupDto) {
    return this.service.create(dto);
  }

  @Get()
  filAll() {
    return this.service.findAll();
  }

  @Get('search')
  async search(@Query() query: SearchTelegramGroupDto) {
    return this.service.search(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: createTelegramGroupDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
