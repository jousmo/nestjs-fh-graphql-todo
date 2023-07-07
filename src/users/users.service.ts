import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupInput } from '../auth/dto/inputs/signup.input';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(signupInput: SignupInput): Promise<User> {
    try {
      const user = this.userRepository.create(signupInput);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

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

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(`the email already exist`);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('please check server logs');
  }
}
