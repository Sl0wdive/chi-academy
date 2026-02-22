import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('comments')
@Controller('api/exhibits/:exhibitId/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Add a comment to an exhibit' })
  @ApiResponse({ status: 201, description: 'Comment successfully added' })
  async create(
    @Param('exhibitId') exhibitId: number,
    @Body() dto: CreateCommentDto,
    @Request() req,
  ) {
    return this.commentsService.create(exhibitId, req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments for an exhibit' })
  @ApiResponse({ status: 200, description: 'List of comments for the exhibit' })
  async findAll(@Param('exhibitId') exhibitId: number) {
    return this.commentsService.findAll(exhibitId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 200, description: 'Comment successfully deleted' })
  async remove(
    @Param('exhibitId') exhibitId: number,
    @Param('commentId') commentId: number,
    @Request() req,
  ) {
    return this.commentsService.remove(exhibitId, commentId, req.user.id);
  }
}
