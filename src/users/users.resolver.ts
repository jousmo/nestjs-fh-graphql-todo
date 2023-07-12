import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ValidRolesArg } from './dto/args/valid-roles.arg';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ValidRolesEnum } from '../auth/enums/valid-roles.enum';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async findAll(
    @Args() validRolesArg: ValidRolesArg,
    @CurrentUser([ValidRolesEnum.admin]) user: User,
  ): Promise<User[]> {
    console.log('User', { user });
    const { roles } = validRolesArg;
    return this.usersService.findAll(roles);
  }

  @Query(() => User, { name: 'user' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser([ValidRolesEnum.admin]) user: User,
  ): Promise<User> {
    console.log('User', { user });
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  blockUser(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser([ValidRolesEnum.admin]) user: User,
  ) {
    console.log('User', { user });
    return this.usersService.blockUser(id);
  }
}
