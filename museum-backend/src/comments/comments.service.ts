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

    const savedComment = await this.commentsRepository.save(comment);

    return this.commentsRepository.findOne({
      where: { id: savedComment.id },
      relations: ['user'],
    });
  }

  async findAll(exhibitId: number) {
    return this.commentsRepository.find({
      where: { exhibitId },
      relations: ['user'],
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
