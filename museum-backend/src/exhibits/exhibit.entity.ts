import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Expose } from 'class-transformer';
import { Comment } from '../comments/comment.entity';

@Entity()
export class Exhibit {
  @Expose()
  @PrimaryGeneratedColumn()
  id!: number;

  @Expose()
  @Column()
  imageUrl!: string;

  @Expose()
  @Column()
  description!: string;

  @Expose()
  @ManyToOne(() => User, (user) => user.exhibits, { eager: true })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  userId!: number;

  @OneToMany(() => Comment, (comment) => comment.exhibit)
  comments: Comment[];

  @Expose()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Expose()
  @Column({ default: 0 })
  commentCount: number;
}
