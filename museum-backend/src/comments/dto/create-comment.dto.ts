import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Text of the comment',
  })
  @IsString()
  @MinLength(1)
  text: string;
}
