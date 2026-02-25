import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PublicService } from './public.service';
import { PaginationDto } from './dto/public.dto';

@Controller('public')
export class PublicController {
  constructor(private publicService: PublicService) {}

  @Get('feed')
  getFeed(@Query() pagination: PaginationDto) {
    return this.publicService.getFeed(pagination.page, pagination.limit);
  }

  @Get('blogs/:slug')
  getBlogBySlug(@Param('slug') slug: string) {
    return this.publicService.getBlogBySlug(slug);
  }
}
