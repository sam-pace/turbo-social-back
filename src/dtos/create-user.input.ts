import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

}
