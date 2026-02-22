import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Exhibit } from '../exhibits/exhibit.entity';
import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the user',
  })
  id!: number;

  @Expose()
  @Column({ unique: true })
  @ApiProperty({
    example: 'username123',
    description: 'The unique username of the user',
  })
  username!: string;

  @Column()
  @ApiProperty({
    example: 'hashedPassword',
    description: 'The hashed password of the user',
  })
  password!: string;

  @OneToMany(() => Exhibit, (exhibit) => exhibit.user, { cascade: true })
  @ApiProperty({
    type: () => [Exhibit],
    description: 'List of exhibits added by the user',
  })
  exhibits!: Exhibit[];

  // @OneToMany(() => Comment, (comment) => comment.user)
  // comments: Comment[];

  @Column({ default: false })
  isAdmin: boolean;
}
