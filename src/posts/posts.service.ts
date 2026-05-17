import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateNewPostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOptions } from '../meta-options/meta-options.entity';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';
import { Post } from './interface/post.interface';
import { User } from '../users/users.entity';
import { TagsService } from '../tags/tags.service';
import { Tags } from '../tags/tags.entity';

@Injectable()
export class PostsService {
    constructor(
        /** ------------------------------------------------|
         * Injecting UserService                            |
         * Injecting tagsService                            |
         * Injecting metaOptions                            |
         * Injecting userRepository                         |
         */ //----------------------------------------------|

        private readonly usersService: UsersService,
        @InjectRepository(MetaOptions)
        private readonly metaOptionsRepository: Repository<MetaOptions>,
        @InjectRepository(Posts)
        private readonly postRepository: Repository<Posts>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly tagsService: TagsService,
    ) {}

    public async findAll(): Promise<Post[]> {
        const post = await this.postRepository.find({
            relations: {
                metaOptions: true,
                // TODO: Dont Showing Password
                // tags: true,
                //author: true,
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

        let tags: Tags[] = [];
        if (createNewPostDto.tags) {
            tags = await this.tagsService.findMultipleTags(
                createNewPostDto.tags,
            );
        }

        const post = this.postRepository.create({
            ...createNewPostDto,
            tags,
            author,
        });
        return this.postRepository.save(post);
    }

    public async deletePosts(postId: number) {
        return this.postRepository.delete(postId);
    }
}
