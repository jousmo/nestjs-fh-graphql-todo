import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
