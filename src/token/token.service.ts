import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entity/token.entity';
import { Repository } from 'typeorm';
import { CreateTokenDto } from './dto/token.dto';

@Injectable()
export class TokenService {
  constructor(@InjectRepository(Token) private tokenRepo: Repository<Token>) {}

  create(dto: CreateTokenDto): Promise<Token> {
    const token = this.tokenRepo.create(dto);
    console.log('token', token);

    return this.tokenRepo.save(token);
  }

  findAll(): Promise<Token[]> {
    return this.tokenRepo.find();
  }

  async findOne(id: number): Promise<Token> {
    const token = await this.tokenRepo.findOneBy({ id });

    if (!token) {
      throw new Error('Token not found');
    }

    return token;
  }

  async update(id: number, dto: CreateTokenDto): Promise<Token> {
    await this.tokenRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const token = await this.tokenRepo.delete(id);
    if (!token.affected) {
      throw new Error('Token not found');
    }
  }
}
