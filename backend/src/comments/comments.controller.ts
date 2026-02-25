import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request, ParseUUIDPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/comments.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('blogs')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  create(
    @Param('id', ParseUUIDPipe) blogId: string,
    @Request() req: any,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.create(blogId, req.user.id, dto);
  }

  @Get(':id/comments')
  findAll(@Param('id', ParseUUIDPipe) blogId: string) {
    return this.commentsService.findByBlogId(blogId);
  }

  @Delete('comments/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id', ParseUUIDPipe) commentId: string, @Request() req: any) {
    return this.commentsService.delete(commentId, req.user.id);
  }
}
