import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  finAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepo.create(user);
    return this.userRepo.save(newUser);
  }

  async update(id: number, user: Partial<User>) {
    await this.userRepo.update(id, user);
    return this.userRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}
