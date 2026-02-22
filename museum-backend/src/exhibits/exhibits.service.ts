import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibit } from './exhibit.entity';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../users/user.entity';

interface PaginatedExhibits {
  data: Exhibit[];
  total: number;
  page: number;
  lastPage: number;
}

@Injectable()
export class ExhibitsService {
  constructor(
    @InjectRepository(Exhibit)
    private exhibitsRepository: Repository<Exhibit>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    file: Express.Multer.File,
    description: string,
    userId: number,
  ): Promise<Exhibit> {
    const uploadPath = path.join(__dirname, '../..', 'static');

    console.log('Upload path:', uploadPath);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    const filePath = path.join(uploadPath, uniqueFileName);

    fs.writeFileSync(filePath, file.buffer);

    const exhibit = this.exhibitsRepository.create({
      imageUrl: `/static/${uniqueFileName}`,
      description,
      userId,
    });

    return this.exhibitsRepository.save(exhibit);
  }

  async findAll(page: number, limit: number): Promise<PaginatedExhibits> {
    if (page < 1 || !page) {
      page = 1;
    }

    if (limit < 1 || !limit) {
      limit = 10;
    }

    const [result, total] = await this.exhibitsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return {
      data: result,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Exhibit> {
    const exhibit = await this.exhibitsRepository.findOne({ where: { id } });
    if (!exhibit) {
      throw new NotFoundException(`Exhibit with ID ${id} not found`);
    }
    return exhibit;
  }

  async remove(id: number, userId: number): Promise<void> {
    const exhibit = await this.exhibitsRepository.findOne({ where: { id } });

    if (!exhibit) {
      throw new NotFoundException(`Exhibit with ID ${id} not found`);
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (user?.isAdmin) {
      await this.exhibitsRepository.remove(exhibit);
      this.removeFile(exhibit.imageUrl);
      return;
    }

    if (exhibit.userId !== userId) {
      throw new ForbiddenException(
        `You do not have permission to delete this exhibit`,
      );
    }

    await this.exhibitsRepository.remove(exhibit);
    this.removeFile(exhibit.imageUrl);
  }

  private removeFile(filePath: string): void {
    const filePathToRemove = path.join(__dirname, '../../..', filePath);
    if (fs.existsSync(filePathToRemove)) {
      fs.unlinkSync(filePathToRemove);
    }
  }
}
