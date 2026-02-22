import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'username123',
    description: 'Username of the user',
  })
  @IsString()
  @MinLength(4, {
    message: 'Username must be at least 4 characters long',
  })
  username!: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  @IsString()
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password!: string;
}
