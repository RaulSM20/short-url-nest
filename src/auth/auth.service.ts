import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtSvc: JwtService,
  ) {}

  async loginUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return null;

    if (user && isPasswordValid) {
      const payload = { sub: user.id, email: user.email, name: user.name };
      return {
        accessToken: await this.jwtSvc.signAsync(payload, {
          secret: 'jwtSecret1234',
          expiresIn: '1d',
        }),
        refreshToken: await this.jwtSvc.signAsync(payload, {
          secret: 'refreshJwtSecret1234',
          expiresIn: '7d',
        }),
        userMail: user.email,
        message: 'login Successful',
      };
    }
  }

  async refreshToken(_refreshToken: string) {
    try {
      const user = this.jwtSvc.verify(_refreshToken, {
        secret: 'refreshJwtSecret1234',
      });
      const payload = { sub: user.id, email: user.email, name: user.name };
      const { accessToken, refreshToken } = await this.generateToken(payload);
      return {
        accessToken,
        refreshToken,
        status: 200,
        message: ' Refresh token successfull',
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async generateToken(user): Promise<Tokens> {
    const jwtPayload = { sub: user.id, email: user.email, name: user.name };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtSvc.signAsync(jwtPayload, {
        secret: 'jwtSecret1234',
        expiresIn: '1d',
      }),
      this.jwtSvc.signAsync(jwtPayload, {
        secret: 'refreshJwtSecret1234',
        expiresIn: '7d',
      }),
    ]);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
