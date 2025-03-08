import { Injectable } from '@nestjs/common'
import { CreateCommentInput } from '@dtos/create-comment.input'
import { UpdateCommentInput } from '@dtos/update-comment.input'
import { PrismaService } from './prisma/prisma.service'
import { Comment } from '@prisma/client'

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentInput: CreateCommentInput) {
    const newComment = await this.prisma.post.create({
      data: {
        content: createCommentInput.content,
        userId: createCommentInput.userId,
      },
    })
    return newComment
  }

  async createMany(data: CreateCommentInput[]): Promise<Comment[]> {
    return this.prisma.comment
      .createMany({ data, skipDuplicates: true })
      .then(() => this.prisma.comment.findMany())
  }

  async findAll() {
    return this.prisma.comment.findMany({
      include: {
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

  async findOne(id: string) {
    return this.prisma.comment.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            username: true,
            avatarUrl: true,
          },
        },
      },
    })
  }

  async findByPost(postId: string) {
    return this.prisma.comment.findMany({
      where: { postId: postId },
      include: {
        user: {
          select: {
            username: true,
            avatarUrl: true,
          },
        },
      },
    })
  }

  async update(id: string, updateCommentInput: UpdateCommentInput) {
    return this.prisma.comment.update({
      where: { id: id },
      data: {
        content: updateCommentInput.content,
        userId: updateCommentInput.userId,
      },
    })
  }

  remove(id: string) {
    return this.prisma.comment.delete({ where: { id: id } })
  }
}
