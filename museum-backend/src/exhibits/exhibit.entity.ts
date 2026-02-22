import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Expose } from 'class-transformer';

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

  @Expose()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
  comments: any;
}
