import { InputType, Field, ID } from '@nestjs/graphql'

@InputType()
export class CreateCommentInput {
  @Field()
  userId: string

  @Field()
  postId: string

  @Field()
  content: string

  @Field()
  createdAt: Date
}
