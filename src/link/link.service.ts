import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LinkService {
  constructor(private prisma: PrismaService) {}

  getLinks() {
    return this.prisma.link.findMany();
  }
  async createLink(link) {
    const { url } = link;
    const shortUrl = Math.random().toString(36).substring(2, 9);

    try {
      const data = await this.prisma.link.create({
        data: { url, shortUrl },
      });
      return data;
    } catch (error) {
      throw new Error('Error creating the link ' + error);
    }
  }
  async getLinkByShortUrl(shortUrl: string) {
    console.log('🚀 ~ LinkService ~ getLinkByShortUrl ~ shortUrl:', shortUrl);
    try {
      const data = await this.prisma.link.findUniqueOrThrow({
        where: { shortUrl },
      });
      return data.url;
    } catch (error) {
      throw new Error('Error creating the link ' + error);
    }
  }
}
