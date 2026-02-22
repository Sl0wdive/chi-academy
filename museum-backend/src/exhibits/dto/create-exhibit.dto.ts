import { ApiProperty } from '@nestjs/swagger';

export class CreateExhibitDto {
  @ApiProperty({ example: 'string($binary)', description: 'Image binary data' })
  image!: string;

  @ApiProperty({ example: 'string', description: 'Exhibit description' })
  description!: string;
}
