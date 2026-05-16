import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { MetaOptionsModule } from '../meta-options/meta-options.module';
import { MetaOptions } from '../meta-options/meta-options.entity';

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([Posts, MetaOptions]),
        MetaOptionsModule,
    ],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}
