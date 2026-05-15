import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule], // Import The entire module
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
