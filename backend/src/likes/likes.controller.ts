import { Controller, Post, Delete, Param, UseGuards, Request, ParseUUIDPipe } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('blogs')
@UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post(':id/like')
  like(@Param('id', ParseUUIDPipe) blogId: string, @Request() req: any) {
    return this.likesService.like(blogId, req.user.id);
  }

  @Delete(':id/like')
  unlike(@Param('id', ParseUUIDPipe) blogId: string, @Request() req: any) {
    return this.likesService.unlike(blogId, req.user.id);
  }
}
