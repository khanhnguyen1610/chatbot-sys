import { IsArray, IsBoolean, IsInt, IsString } from 'class-validator';

export class BotNotificationDto {
  @IsBoolean()
  enable: boolean;

  @IsString()
  nameBot: string;

  @IsInt()
  tokenId: number;

  @IsArray()
  contentIds: number[];
}
