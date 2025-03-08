import { InputType, Field, ID } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field()
  username: string

  @Field({ nullable: true })
  avatarUrl: string

  @Field()
  email: string

  @Field()
  password: string
}
