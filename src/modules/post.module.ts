import { Module } from '@nestjs/common';
import { PostService } from '@services/post.service';
import { PostResolver } from '@resolvers/post.resolver';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
