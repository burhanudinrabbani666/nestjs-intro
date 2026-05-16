import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateNewPostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOptions } from '../meta-options/meta-options.entity';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';
import { Post } from './interface/post.interface';

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

    public async findAll(): Promise<Post[]> {
        const post = await this.postRepository.find({
            relations: {
                metaOptions: true,
            },
        });

        return post;
    }

    // TODO: adding slug guard
    public async createNewPost(
        createNewPostDto: CreateNewPostDto,
    ): Promise<Post> {
        const post = this.postRepository.create(createNewPostDto); // metaOptions is cascade
        return this.postRepository.save(post);
    }
}
