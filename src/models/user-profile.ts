import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class UserProfile {
  @Field()
  username: string

  @Field({ nullable: true })
  avatarUrl?: string
}
