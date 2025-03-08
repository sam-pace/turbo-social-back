import { InputType, Int, Field, ID } from '@nestjs/graphql'
import { CreateCommentInput } from './create-comment.input'

@InputType()
export class CreatePostInput {
  @Field()
  userId: string

  @Field()
  content: string

  @Field()
  imageUrl?: string

  @Field(() => Int)
  likes?: number
}
