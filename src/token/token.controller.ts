import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/token.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserAuth } from 'src/auth/entity/user.entity';

@Controller('token')
@UseGuards(JwtAuthGuard)
export class TokenController {
  constructor(private readonly service: TokenService) {}

  @Post()
  create(@Body() dto: CreateTokenDto, @Request() req: { user: UserAuth }) {
    const user = req.user;
    return this.service.create({ ...dto, userId: user.id });
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: CreateTokenDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
