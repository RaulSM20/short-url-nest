import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LinkController],
  providers: [LinkService, PrismaService],
})
export class LinkModule {}
