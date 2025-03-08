import { Module } from '@nestjs/common'
import { PostService } from '@services/post.service'
import { PostResolver } from '@resolvers/post.resolver'
import { PrismaModule } from './prisma.module'
import { CommentService } from '@services/comment.service'

@Module({
  imports: [PrismaModule],
  providers: [PostResolver, PostService, CommentService],
  exports: [PostService],
})
export class PostModule {}
