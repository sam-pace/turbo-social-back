import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  avatarUrl: string;

  @Field({ nullable: true })
  bio: string;

  @Field()
  createdAt: Date;
}
