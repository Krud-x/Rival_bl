import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blogs.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('blogs')
@UseGuards(JwtAuthGuard)
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateBlogDto) {
    return this.blogsService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.blogsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
    return this.blogsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: any,
    @Body() dto: UpdateBlogDto,
  ) {
    return this.blogsService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
    return this.blogsService.delete(id, req.user.id);
  }
}
