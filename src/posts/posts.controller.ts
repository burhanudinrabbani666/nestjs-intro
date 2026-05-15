import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
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
    @Get('{/:userId}')
    public getPosts(@Param('userId', ParseIntPipe) userId: number) {
        return this.postService.findAll(userId);
    }

    @Post()
    public createNewPost(@Body() createNewPostDto: CreateNewPostDto) {
        console.log(createNewPostDto);
    }
}
