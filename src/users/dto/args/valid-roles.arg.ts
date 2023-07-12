import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';
import { ValidRolesEnum } from '../../../auth/enums/valid-roles.enum';

@ArgsType()
export class ValidRolesArg {
  @Field(() => [ValidRolesEnum], { nullable: true })
  @IsArray()
  roles: ValidRolesEnum[] = [];
}
