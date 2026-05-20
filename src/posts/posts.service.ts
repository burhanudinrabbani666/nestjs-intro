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
import { PaginationProvider } from '../common/pagination/provider/pagination.provider';
import { Paginated } from '../common/pagination/interface/paginated.interface';
import { ActiveUserData } from '../auth/interface/active-users.interface';
import { CreatePostProvider } from './providers/create-post.provider';

@Injectable()
export class PostsService {
    constructor(
        //
        /** ----------------------------------------------- /
         * Injecting UserService                            /
         * Injecting tagsService                            /
         * Injecting metaOptions                            /
         * Injecting userRepository                         /
         * Injecting paginationProvider                     /
         * Injecting CreatePostProvider                     /
         ------------------------------------------------- */
        private readonly usersService: UsersService,
        @InjectRepository(MetaOptions)
        private readonly metaOptionsRepository: Repository<MetaOptions>,
        @InjectRepository(Posts)
        private readonly postRepository: Repository<Posts>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly tagsService: TagsService,
        private readonly paginationProvider: PaginationProvider,
        private readonly createPostProvider: CreatePostProvider,
    ) {}

    /** --------------------------------------------------------------- /
     * Fetch all Post Including author, tags and MetaOptions            /
     * The way we Querying tags and Author is by options in post entity /
     ----------------------------------------------------------------- */
    public async findAll(postQuery: GetPostsDto): Promise<Paginated<Post>> {
        const posts = await this.paginationProvider.paginateQuery(
            {
                limit: postQuery.limit,
                page: postQuery.page,
            },
            this.postRepository,
        );

        return posts;
    }

    public async createNewPost(
        createNewPostDto: CreateNewPostDto,
        user: ActiveUserData,
    ) {
        return this.createPostProvider.createNewPost(createNewPostDto, user);
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
