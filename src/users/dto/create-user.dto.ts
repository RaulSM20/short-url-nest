import { IsEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  //     id       String  @id @default(cuid())
  //   email    String  @unique
  //   name     String?
  //   password String

  @IsString()
  email: string;

  @IsString()
  @IsEmpty()
  name: string;

  @IsString()
  @IsEmpty()
  password: string;
}
