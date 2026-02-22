import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Exhibit } from './exhibits/exhibit.entity';
import { AuthModule } from './auth/auth.module';
import { ExhibitsModule } from './exhibits/exhibits.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5431', 10),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? '123456',
      database: process.env.DB_NAME ?? 'museumdb',
      entities: [User, Exhibit],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    ExhibitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
