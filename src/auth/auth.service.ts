import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthResponseType } from './types/auth-response.type';
import { SignupInput } from './dto/inputs/signup.input';
import { LoginInput } from './dto/inputs/login.input';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signup(signupInput: SignupInput): Promise<AuthResponseType> {
    const user = await this.userService.createUser(signupInput);
    const token = this.jwtService.sign({ id: user.id });
    return { user, token };
  }

  async login(loginInput: LoginInput): Promise<AuthResponseType> {
    const user = await this.userService.findOneByEmail(loginInput.email);
    const isSamePassword = bcrypt.compareSync(
      loginInput.password,
      user.password,
    );

    if (!isSamePassword)
      throw new BadRequestException('email/password do not match');

    const token = this.jwtService.sign({ id: user.id });

    return {
      user,
      token,
    };
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.userService.findOne(id);

    if (!user.isActive) throw new UnauthorizedException('user is inactive');

    delete user.password;
    return user;
  }

  async revalidateToken(user: User) {
    const token = this.jwtService.sign({ id: user.id });
    return {
      user,
      token,
    };
  }
}
