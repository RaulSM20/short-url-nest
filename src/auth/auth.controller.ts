import { Controller, Post, Body, NotFoundException, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    const user = await this.authService.loginUser(email, password);

    if (!user) throw new NotFoundException();

    return user;
  }

  @Post('/refresh')
  refreshToken(@Req() request: Request) {
    const [token] = request.headers['authorization']?.split(' ') || [];
    return this.authService.refreshToken(token);
  }
}
