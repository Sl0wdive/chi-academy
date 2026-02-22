import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './comment.entity';
import { Exhibit } from 'src/exhibits/exhibit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Exhibit])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
