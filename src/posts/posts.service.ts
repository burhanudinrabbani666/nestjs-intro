import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateNewPostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOptions } from '../meta-options/meta-options.entity';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';
import { Post } from './interface/post.interface';
import { User } from '../users/users.entity';

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
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public async findAll(): Promise<Post[]> {
        const post = await this.postRepository.find({
            relations: {
                metaOptions: true,
                // author: true,
            },
        });

        return post;
    }

    // TODO: adding slug guard
    public async createNewPost(
        createNewPostDto: CreateNewPostDto,
    ): Promise<Post> {
        // Find author
        const author = await this.usersService.findOneById(
            createNewPostDto.authorId,
        );

        if (!author) throw new NotFoundException();

        const post = this.postRepository.create({
            ...createNewPostDto,
            author,
        });
        return this.postRepository.save(post);
    }

    public async deletePosts(postId: number) {
        return this.postRepository.delete(postId);
    }
}
