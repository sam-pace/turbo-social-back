import { Module } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CommentResolver } from '../resolvers/comment.resolver';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CommentResolver, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
