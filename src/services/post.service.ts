import { Injectable } from '@nestjs/common';
import { CreatePostInput } from '../dtos/create-post.input';
import { UpdatePostInput } from '../dtos/update-post.input';
import { PrismaService } from './prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostInput: CreatePostInput) {
    const newPost = await this.prisma.post.create({
      data: {
        content: createPostInput.content,
        userId: createPostInput.userId,
        imageUrl: createPostInput.imageUrl,
        likes: createPostInput.likes ?? 0,
      },
    });

    return newPost;
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: string) {
    return this.prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        comments: true,
      },
    });
  }

  update(id: string, updatePostInput: UpdatePostInput) {
    return this.prisma.post.update({
      where: { id: id },
      data: {
        content: updatePostInput.content,
        userId: updatePostInput.userId,
      },
    });
  }

  remove(id: string) {
    return this.prisma.post.delete({ where: { id: id } });
  }
}
