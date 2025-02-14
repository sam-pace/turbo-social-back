import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from './user.model';
import { Comment } from './comment.model';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field(() => User)
  user: User;

  @Field()
  content: string;

  @Field()
  imageUrl: string;

  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => Int)
  likes: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
