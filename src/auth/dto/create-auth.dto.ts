import { IsEmpty, IsString, Min } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsEmpty()
  email: string;

  @IsString()
  @IsEmpty()
  @Min(4)
  password: string;
}
