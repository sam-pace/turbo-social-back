import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from './post.model';
import { User } from './user.model';

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field(() => User)
  user: User;

  @Field()
  postId: string;

  @Field(() => Post)
  post: Post;

  @Field()
  content: string;

  @Field()
  createdAt: Date;
}
