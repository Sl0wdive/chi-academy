import { Module } from '@nestjs/common';
import { ExhibitsService } from './exhibits.service';
import { ExhibitsController } from './exhibits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibit } from './exhibit.entity';
import { User } from '../users/user.entity';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Exhibit, User])],
  providers: [ExhibitsService, NotificationsGateway],
  controllers: [ExhibitsController],
})
export class ExhibitsModule {}
