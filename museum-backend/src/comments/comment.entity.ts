import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Exhibit } from 'src/exhibits/exhibit.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @Expose()
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Expose()
  @Column()
  @ApiProperty({ example: 'string' })
  text: string;

  @ManyToOne(
    () => Exhibit,
    (exhibit: Exhibit) => exhibit.comments as Comment[],
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'exhibitId' })
  exhibit: Exhibit;

  @Expose()
  @Column()
  @ApiProperty({ example: 1, description: 'ID of the exhibit' })
  exhibitId: number;

  // @ManyToOne(() => User, (user) => user.comments, { eager: true })
  @JoinColumn({ name: 'userId' })
  @ApiProperty({ type: () => User })
  user: User;

  @Expose()
  @Column()
  @ApiProperty({
    example: 1,
    description: 'ID of the user who wrote the comment',
  })
  userId: number;
}
