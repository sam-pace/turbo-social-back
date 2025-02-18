import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from './post.model';
import { Comment } from './comment.model';

@ObjectType()
export class User {

  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  avatarUrl: string;

  @Field({ nullable: true })
  bio: string;

  @Field()
  createdAt: Date;

  @Field(()=> [Comment])
  comments: [Comment];

  @Field(()=> [Post])
  posts: [Post];
}
