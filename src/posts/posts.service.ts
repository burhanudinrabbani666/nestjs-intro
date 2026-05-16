import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateNewPostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOptions } from '../meta-options/meta-options.entity';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';

@Injectable()
export class PostsService {
    constructor(
        /**
         * Injecting UserService
         * Injecting metaOptions
         */
        private readonly usersService: UsersService,
        @InjectRepository(MetaOptions)
        private readonly metaOptionsRepository: Repository<MetaOptions>,
        @InjectRepository(Posts)
        private readonly postRepository: Repository<Posts>,
    ) {}

    public findAll(userId: number) {
        const user = this.usersService.findOneById(userId);

        return [
            {
                user,
                title: 'Test Title1',
                content: 'content1',
            },
            {
                user,
                title: 'Test Title2',
                content: 'content2',
            },
        ];
    }

    // TODO: adding slug guard
    public async createNewPost(createNewPostDto: CreateNewPostDto) {
        const post = this.postRepository.create(createNewPostDto); // metaOptions is cascade
        return this.postRepository.save(post);
    }
}
