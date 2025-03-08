import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PostService } from '@services/post.service'
import { Post } from '@models/post.model'
import { CreatePostInput } from '@dtos/create-post.input'
import { UpdatePostInput } from '@dtos/update-post.input'
import { CommentService } from '@services/comment.service'

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService
  ) {}

  @Query(() => [Comment])
  async commentsByPost(@Args('postId', { type: () => String }) postId: string) {
    return this.commentService.findByPost(postId)
  }

  @Mutation(() => Post)
  createPost(@Args('createPost') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput)
  }

  @Query(() => [Post], { name: 'postAll' })
  findAll() {
    return this.postService.findAll()
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id') id: string) {
    return this.postService.findOne(id)
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePost') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput)
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => String }) id: string) {
    return this.postService.remove(id)
  }
}
