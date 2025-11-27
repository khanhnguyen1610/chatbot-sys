import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from './entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserAuth) private usersRepo: Repository<UserAuth>,
    private jwtService: JwtService,
  ) {}

  async register(userDto: UserDto): Promise<UserAuth> {
    const hashed = await bcrypt.hash(userDto.password, 10);
    const user = this.usersRepo.create({
      username: userDto.username,
      password: hashed,
    });
    return this.usersRepo.save(user);
  }

  async validateUser(userDto: UserDto): Promise<UserAuth> {
    const user = await this.usersRepo.findOne({
      where: { username: userDto.username },
    });
    if (user && (await bcrypt.compare(userDto.password, user.password))) {
      const { ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: UserDto): Promise<{ access_token: string }> {
    const validUser = await this.validateUser(user);
    const payload = { username: validUser.username, sub: validUser.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
