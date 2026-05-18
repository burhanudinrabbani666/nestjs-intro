import {
    BadRequestException,
    Body,
    Injectable,
    NotFoundException,
    Patch,
    RequestTimeoutException,
} from '@nestjs/common';
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
import { PatchPostDto } from './dto/patch-post.dto';
import { GetPostsDto } from './dto/get-posts.dtos';

@Injectable()
export class PostsService {
    constructor(
        //
        /** ----------------------------------------------- /
         * Injecting UserService                            /
         * Injecting tagsService                            /
         * Injecting metaOptions                            /
         * Injecting userRepository                         /
         ------------------------------------------------- */
        private readonly usersService: UsersService,
        @InjectRepository(MetaOptions)
        private readonly metaOptionsRepository: Repository<MetaOptions>,
        @InjectRepository(Posts)
        private readonly postRepository: Repository<Posts>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly tagsService: TagsService,
    ) {}

    /** --------------------------------------------------------------- /
     * Fetch all Post Including author, tags and MetaOptions            /
     * The way we Querying tags and Author is by options in post entity /
     ----------------------------------------------------------------- */
    public async findAll(postQuery: GetPostsDto): Promise<Post[]> {
        const { limit, page, startDate, endDate } = postQuery;

        const post = await this.postRepository.find({
            take: limit ? limit : 10,
            skip: (page ? page - 1 : 0) * (limit ? limit : 10),
        });

        return post;
    }

    public async createNewPost(
        createNewPostDto: CreateNewPostDto,
    ): Promise<Post> {
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

    /** ----------------------------------------------------------- /
     * The Method to update post with                               /
     * 200: Success update Post                                     /
     * 404: Tags Not Found                                          /
     * 404: Post Not Found                                          /
     * 408: Failed Connect to database, timeout!                    /
        ---------------------------------------------------------- */
    @Patch()
    public async updatePost(@Body() patchPostDTo: PatchPostDto) {
        let tags: Tags[] = [];
        try {
            if (patchPostDTo.tags) {
                tags = await this.tagsService.findMultipleTags(
                    patchPostDTo.tags,
                );

                if (!tags || tags.length !== patchPostDTo.tags.length)
                    throw new BadRequestException('Please Check Your tag Id');
            }
        } catch (error) {
            console.log(error);
            throw new RequestTimeoutException(
                'Unable to proccess at the moment please try later',
                { description: 'Error connecting to the database' },
            );
        }

        try {
            const post = await this.postRepository.findOne({
                where: { id: patchPostDTo.id },
            });

            if (!post) throw new NotFoundException();

            const { featuredImageUrl: NewFeaturedImage } = patchPostDTo;
            post.title = patchPostDTo.title ?? post.title;
            post.content = patchPostDTo.content ?? post.content;
            post.status = patchPostDTo.status ?? post.status;
            post.postType = patchPostDTo.postType ?? post.postType;
            post.slug = patchPostDTo.slug ?? post.slug;
            post.featuredImageUrl = NewFeaturedImage ?? post.featuredImageUrl;
            post.publishOn = patchPostDTo.publishOn ?? post.publishOn;
            post.tags = tags;

            return this.postRepository.save(post);
        } catch (error) {
            console.log(error);
            throw new RequestTimeoutException(
                'Unable to proccess at the moment please try later',
                { description: 'Error connecting to the database' },
            );
        }
    }
}
