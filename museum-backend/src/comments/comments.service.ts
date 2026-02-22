import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Exhibit } from '../exhibits/exhibit.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Exhibit)
    private exhibitsRepository: Repository<Exhibit>,
  ) {}

  async create(exhibitId: number, userId: number, dto: CreateCommentDto) {
    const comment = this.commentsRepository.create({
      text: dto.text,
      exhibitId,
      userId,
    });

    await this.exhibitsRepository.increment(
      { id: exhibitId },
      'commentCount',
      1,
    );

    return this.commentsRepository.save(comment);
  }

  async findAll(exhibitId: number) {
    return this.commentsRepository.find({
      where: { exhibitId },
      order: { id: 'ASC' },
    });
  }

  async remove(exhibitId: number, commentId: number, userId: number) {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId, exhibitId, userId },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    await this.commentsRepository.delete(comment.id);
    await this.exhibitsRepository.decrement(
      { id: exhibitId },
      'commentCount',
      1,
    );
    return { message: 'Comment successfully deleted' };
  }
}
