import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class SignupInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  fullName: string;

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
