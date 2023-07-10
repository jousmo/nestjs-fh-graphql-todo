import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRolesEnum } from '../enums/valid-roles.enum';

export const CurrentUser = createParamDecorator(
  (roles: ValidRolesEnum[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (!user)
      throw new InternalServerErrorException(
        'no user inside the request - make sure that we used the auth guard',
      );

    if (roles.length === 0) return user;

    for (const userRole of user.roles) {
      if (roles.includes(userRole)) {
        return user;
      }
    }

    throw new ForbiddenException('user need a valid role');
  },
);
