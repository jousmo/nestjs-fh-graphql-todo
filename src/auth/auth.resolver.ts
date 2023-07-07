import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/inputs/signup.input';
import { LoginInput } from './dto/inputs/login.input';
import { AuthResponseType } from './types/auth-response.type';

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
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Query(() => AuthResponseType)
  async revalidateToken() {
    return this.authService.revalidateToken();
  }
}
