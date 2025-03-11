import { Injectable } from '@nestjs/common'
import { CreatePostInput } from '@dtos/create-post.input'
import { UpdatePostInput } from '@dtos/update-post.input'
import { PrismaService } from './prisma/prisma.service'

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
    })

    return newPost
  }

  async findAll(userId?: string) {
      const posts = await this.prisma.post.findMany({
        include: {
          comments: true,
          user: {
            select: { id: true, username: true, avatarUrl: true },
          },
          likedBy: true,
        },
      });

      if (!userId) {
        return posts.map((post) => ({ ...post, isLiked: false }));
      }

      return posts.map((post) => ({
        ...post,
        isLiked: post.likedBy.some((user) => user.id === userId),
      }));
    }

  findOne(id: string) {
    return this.prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        comments: true,
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    })
  }

  async toggleLike(postId: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: { likedBy: true },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!post || !user) {
      return null;
    }

    const isLiked = post.likedBy.some((likedUser) => likedUser.id === userId);

    if (isLiked) {
      await this.prisma.post.update({
        where: { id: postId },
        data: {
          likedBy: { disconnect: { id: userId } },
          likes: { decrement: 1 },
        },
      });
    } else {
      await this.prisma.post.update({
        where: { id: postId },
        data: {
          likedBy: { connect: { id: userId } },
          likes: { increment: 1 },
        },
      });
    }

    return this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        comments: true,
        user: {
          select: { id: true, username: true, avatarUrl: true },
        },
        likedBy: true,
      },
    });
  }

  update(id: string, updatePostInput: UpdatePostInput) {
    return this.prisma.post.update({
      where: { id: id },
      data: {
        content: updatePostInput.content,
        likes: updatePostInput.likes,
      },
    })
  }

  remove(id: string) {
    return this.prisma.post.delete({ where: { id: id } })
  }
}
