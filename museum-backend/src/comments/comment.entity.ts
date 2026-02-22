import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Exhibit } from '../exhibits/exhibit.entity';
import { User } from '../users/user.entity';
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
  @ApiProperty({ example: 1, description: 'ID of the comment' })
  id: number;

  @Expose()
  @Column()
  @ApiProperty({ example: 'string', description: 'Comment text' })
  text: string;

  @ManyToOne(() => Exhibit, (exhibit: Exhibit) => exhibit.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'exhibitId' })
  exhibit: Exhibit;

  @Expose()
  @Column()
  @ApiProperty({ example: 1, description: 'ID of the exhibit' })
  exhibitId: number;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
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

  @Expose()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
