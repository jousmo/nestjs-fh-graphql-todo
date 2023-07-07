import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = this.userRepository.findOneBy({ id });

    if (!user) throw new BadRequestException(`user ${id} not found`);

    return user;
  }

  async blockUser(id: string): Promise<User> {
    const user = await this.findOne(id);
    user.isActive = false;

    return this.userRepository.save(user);
  }
}
