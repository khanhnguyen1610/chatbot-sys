import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class TokenDto {
  id: number;
  userId: number;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

export class CreateTokenDto {
  userId: number;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsOptional()
  @IsDateString()
  expiresAt: Date;
}
