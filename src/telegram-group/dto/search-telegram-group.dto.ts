import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchTelegramGroupDto {
  @ApiPropertyOptional({
    description: 'Search theo tên group',
    example: 'Crypto',
  })
  @IsString()
  @IsOptional()
  nameChannelOrGroup?: string;

  @ApiPropertyOptional({
    description: 'Filter theo channelOrGroupId',
    example: '123456',
  })
  @IsString()
  @IsOptional()
  channelOrGroupId?: string;

  @ApiPropertyOptional({ description: 'Trang hiện tại', example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Số lượng items mỗi trang', example: 10 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  perPage?: number = 10;

  @ApiPropertyOptional({
    description: 'Sort field',
    example: 'nameChannelOrGroup',
  })
  @IsString()
  @IsOptional()
  sortBy?: string = 'id';

  @ApiPropertyOptional({ description: 'Sort order', example: 'ASC' })
  @IsString()
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
