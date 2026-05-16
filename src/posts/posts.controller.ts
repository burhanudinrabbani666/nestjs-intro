import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateNewPostDto } from './dto/create-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(
        /**
         * Injecting Post Service
         */
        private readonly postService: PostsService,
    ) {}

    /**
     * GET localhost:3000/posts/:userId
     */
    @Get()
    public getPosts() {
        return this.postService.findAll();
    }

    @Post()
    public createNewPost(@Body() createNewPostDto: CreateNewPostDto) {
        return this.postService.createNewPost(createNewPostDto);
    }
}
