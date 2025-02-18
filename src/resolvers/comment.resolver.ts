import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommentService } from '@services/comment.service';
import { Comment } from '@models/comment.model';
import { CreateCommentInput } from '@dtos/create-comment.input';
import { UpdateCommentInput } from '@dtos/update-comment.input';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  createComment(@Args('createComment') createCommentInput: CreateCommentInput) {
    return this.commentService.create(createCommentInput);
  }

  @Mutation(() => [Comment])
  async createMany(
    @Args('data', { type: () => [CreateCommentInput] })
    data: CreateCommentInput[],
  ) {
    return this.commentService.createMany(data);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll() {
    return this.commentService.findAll();
  }

  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.commentService.findOne(id);
  }

  @Mutation(() => Comment)
  updateComment(@Args('updateComment') updateCommentInput: UpdateCommentInput) {
    return this.commentService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => String }) id: string) {
    return this.commentService.remove(id);
  }
}
