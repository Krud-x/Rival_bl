import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blogs.dto';
import slugify from 'slugify';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateBlogDto) {
    const slug = this.generateSlug(dto.title);

    const blog = await this.prisma.blog.create({
      data: {
        userId,
        title: dto.title,
        slug,
        content: dto.content,
        summary: dto.summary || null,
        isPublished: dto.isPublished || false,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return blog;
  }

  async findAll(userId: string) {
    return this.prisma.blog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const blog = await this.prisma.blog.findFirst({
      where: { id, userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return blog;
  }

  async update(id: string, userId: string, dto: UpdateBlogDto) {
    const blog = await this.prisma.blog.findFirst({
      where: { id, userId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    const updateData: any = { ...dto };

    if (dto.title) {
      updateData.slug = this.generateSlug(dto.title, blog.slug);
    }

    return this.prisma.blog.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async delete(id: string, userId: string) {
    const blog = await this.prisma.blog.findFirst({
      where: { id, userId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    await this.prisma.blog.delete({
      where: { id },
    });

    return { message: 'Blog deleted successfully' };
  }

  async findBySlug(slug: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { slug, isPublished: true },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return blog;
  }

  private generateSlug(title: string, existingSlug?: string): string {
    const baseSlug = slugify(title, { lower: true, strict: true });
    
    if (existingSlug && existingSlug.startsWith(baseSlug)) {
      return existingSlug;
    }
    
    return baseSlug;
  }
}
