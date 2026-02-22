import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Delete,
  Param,
  Request,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import 'multer';
import { ExhibitsService } from './exhibits.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Exhibit } from './exhibit.entity';
import { QueryExhibitsDto } from './dto/query-exhibits.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('exhibits')
@Controller('api/exhibits')
export class ExhibitsController {
  constructor(private exhibitsService: ExhibitsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new exhibit' })
  @ApiResponse({ status: 201, description: 'Exhibit created successfully' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
        description: { type: 'string' },
      },
    },
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createExhibitDto: CreateExhibitDto,
    @Request() req,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif)$/)) {
      throw new BadRequestException(
        'File must be an image of type jpg, jpeg, png, or gif',
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('File size must not exceed 5MB');
    }

    if (!createExhibitDto.description || !createExhibitDto.description.length) {
      throw new BadRequestException(
        `Description is required and must not be empty`,
      );
    }

    const exhibit = await this.exhibitsService.create(
      file,
      createExhibitDto.description,
      req.user.id,
      req.user.username,
    );

    return exhibit;
  }

  @Get()
  @ApiOperation({ summary: 'Get all exhibits' })
  @ApiResponse({ status: 200, description: 'List of all exhibits' })
  async findAll(@Query() query: QueryExhibitsDto) {
    const { page = 1, limit = 10 } = query;

    const exhibits = await this.exhibitsService.findAll(page, limit);

    return {
      ...exhibits,
      data: plainToInstance(Exhibit, exhibits.data, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get('post/:id')
  @ApiOperation({ summary: 'Get exhibit by ID' })
  @ApiResponse({ status: 200, description: 'Information about the exhibit' })
  @ApiResponse({ status: 404, description: 'Exhibit not found' })
  async findOne(@Param('id') id: number) {
    const exhibit = await this.exhibitsService.findOne(id);
    return plainToInstance(Exhibit, exhibit, { excludeExtraneousValues: true });
  }

  @Get('my-posts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get exhibits created by the current user' })
  @ApiResponse({
    status: 200,
    description: 'List of exhibits created by the current user',
  })
  async findMyExhibits(@Query() query: QueryExhibitsDto, @Request() req) {
    const { page = 1, limit = 10 } = query;

    const exhibits = await this.exhibitsService.findMyExhibits(
      req.user.id,
      page,
      limit,
    );

    return {
      ...exhibits,
      data: plainToInstance(Exhibit, exhibits.data, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete exhibit by ID' })
  @ApiResponse({ status: 200, description: 'Exhibit successfully deleted' })
  @ApiResponse({
    status: 404,
    description: 'Exhibit with the specified ID not found',
  })
  async remove(@Param('id') id: number, @Request() req) {
    return this.exhibitsService.remove(id, req.user.id);
  }
}
