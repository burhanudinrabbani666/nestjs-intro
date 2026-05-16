import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { MetaOptionsModule } from '../meta-options/meta-options.module';
import { MetaOptions } from '../meta-options/meta-options.entity';
import { User } from '../users/users.entity';

@Module({
    imports: [
        UsersModule,
        MetaOptionsModule,
        TypeOrmModule.forFeature([Posts, MetaOptions, User]),
    ],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}
