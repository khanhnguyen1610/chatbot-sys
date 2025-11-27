import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class createContentManagementDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @ArrayNotEmpty()
  time: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  telegramGroupIds: number[];
}
