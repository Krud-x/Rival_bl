import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async like(blogId: string, userId: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_blogId: {
          userId,
          blogId,
        },
      },
    });

    if (existingLike) {
      throw new ConflictException('Blog already liked');
    }

    await this.prisma.like.create({
      data: {
        userId,
        blogId,
      },
    });

    const likesCount = await this.prisma.like.count({
      where: { blogId },
    });

    return {
      liked: true,
      likesCount,
    };
  }

  async unlike(blogId: string, userId: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_blogId: {
          userId,
          blogId,
        },
      },
    });

    if (!existingLike) {
      throw new ConflictException('Blog not liked yet');
    }

    await this.prisma.like.delete({
      where: {
        userId_blogId: {
          userId,
          blogId,
        },
      },
    });

    const likesCount = await this.prisma.like.count({
      where: { blogId },
    });

    return {
      liked: false,
      likesCount,
    };
  }

  async getLikesCount(blogId: string) {
    return this.prisma.like.count({
      where: { blogId },
    });
  }

  async isLiked(blogId: string, userId: string) {
    const like = await this.prisma.like.findUnique({
      where: {
        userId_blogId: {
          userId,
          blogId,
        },
      },
    });

    return !!like;
  }
}
