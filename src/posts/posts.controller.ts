import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
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

    @Delete()
    public deletePosts(@Query('id', ParseIntPipe) id: number) {
        return this.postService.deletePosts(id);
    }
}
