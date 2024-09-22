import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LinkService } from './link.service';

@Controller()
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get('link')
  getLinks() {
    return this.linkService.getLinks();
  }
  @Get('/:shortUrl')
  getLinkByShortUrl(@Param('shortUrl') shortUrl: string) {
    return this.linkService.getLinkByShortUrl(shortUrl);
  }

  @Post('link')
  createLink(@Body() link) {
    return this.linkService.createLink(link);
  }
}
