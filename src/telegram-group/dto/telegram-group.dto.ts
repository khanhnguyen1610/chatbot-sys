import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class createTelegramGroupDto {
  @IsString()
  @IsNotEmpty()
  nameChannelOrGroup: string;

  @IsString()
  @IsNotEmpty()
  channelOrGroupId: string;

  @IsNumber()
  @IsOptional()
  countTime: number;
}
