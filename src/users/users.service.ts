import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async create(createUser: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUser.password, 10);
      const data = this.prisma.user.create({
        data: {
          email: createUser.email,
          name: createUser.name,
          password: hashedPassword,
        },
      });
      const { accessToken, refreshToken } =
        await this.authService.generateToken(data);
      return {
        accessToken,
        refreshToken,
        userMail: (await data).email,
        status: HttpStatus.CREATED,
        message: 'User created successfull',
      };
    } catch (error) {
      throw new Error('Error creating user ' + error);
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
