import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthResponseType } from './types/auth-response.type';
import { SignupInput } from './dto/inputs/signup.input';
import { LoginInput } from './dto/inputs/login.input';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signup(signupInput: SignupInput): Promise<AuthResponseType> {
    const user = await this.userService.createUser(signupInput);
    const token = 'ABC1234';
    return {
      user,
      token,
    };
  }

  async login(loginInput: LoginInput): Promise<AuthResponseType> {
    const user = await this.userService.findOneByEmail(loginInput.email);
    const isSamePassword = bcrypt.compareSync(
      loginInput.password,
      user.password,
    );

    if (!isSamePassword)
      throw new BadRequestException('email/password do not match');

    const token = 'ABC1234';
    return {
      user,
      token,
    };
  }

  async revalidateToken() {
    throw new Error('not implement');
  }
}
