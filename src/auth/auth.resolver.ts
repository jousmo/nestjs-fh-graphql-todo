import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/inputs/signup.input';
import { LoginInput } from './dto/inputs/login.input';
import { AuthResponseType } from './types/auth-response.type';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseType)
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<AuthResponseType> {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponseType)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponseType> {
    return this.authService.login(loginInput);
  }

  @Query(() => AuthResponseType)
  @UseGuards(JwtAuthGuard)
  async revalidateToken(@CurrentUser() user: User): Promise<AuthResponseType> {
    return this.authService.revalidateToken(user);
  }
}
