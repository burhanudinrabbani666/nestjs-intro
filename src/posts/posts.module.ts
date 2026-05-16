import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts.entity';

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([Posts])],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}
