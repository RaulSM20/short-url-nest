import { Module } from '@nestjs/common';
import { LinkModule } from './link/link.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LinkModule, UsersModule, AuthModule],
})
export class AppModule {}
