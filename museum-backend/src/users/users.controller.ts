import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  Query,
  NotFoundException,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

interface RequestWithUser extends Request {
  user: JwtPayload;
}

const MinLoginLength = 4;
const MinPasswordLength = 4;

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'New user registration' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    if (
      !createUserDto.username ||
      !createUserDto.password ||
      createUserDto.username.length < MinLoginLength ||
      createUserDto.password.length < MinPasswordLength
    ) {
      throw new BadRequestException(
        `Username and password must be at least ${MinLoginLength} characters long`,
      );
    }

    const user = await this.usersService.create(
      createUserDto.username,
      createUserDto.password,
    );
    return plainToInstance(User, user, { excludeExtraneousValues: true });
  }

  @Get()
  @ApiOperation({ summary: 'Get user by ID or username' })
  @ApiQuery({ name: 'id', required: false, description: 'User ID' })
  @ApiQuery({
    name: 'username',
    required: false,
    description: 'Username',
  })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUser(
    @Query('id') id?: number,
    @Query('username') username?: string,
  ) {
    if (!id && !username) {
      throw new NotFoundException('ID or username must be specified');
    }

    const user = id
      ? await this.usersService.findById(id)
      : await this.usersService.findByUsername(username!);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(User, user, { excludeExtraneousValues: true });
  }

  @Get('my-profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get information about the current user' })
  @ApiResponse({
    status: 200,
    description: 'Information about the current user',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getMyProfile(@Request() req: RequestWithUser) {
    const user = await this.usersService.findById(req.user.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(User, user, { excludeExtraneousValues: true });
  }
}
