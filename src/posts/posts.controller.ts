import {
    Body,
    Controller,
    Delete,
    Get,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PostsService } from './posts.service';
import { CreateNewPostDto } from './dto/create-post.dto';
import { PatchPostDto } from './dto/patch-post.dto';
import { Posts } from './posts.entity';
import { GetPostsDto } from './dto/get-posts.dtos';
import { Request } from 'express';
// import { type RequestWithUserField } from '../common/custom-request/request-with-user';
import { ActiveUser } from '../auth/decarators/active-user-data.decorators';
import { type ActiveUserData } from '../auth/interface/active-users.interface';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(
        /** --------------------------- /
         * Injecting Post Service       /
         ----------------------------- */
        private readonly postService: PostsService,
    ) {}

    /**
     * GET localhost:3000/posts/:userId
     */
    @Get()
    public getPosts(@Query() postQuery: GetPostsDto) {
        return this.postService.findAll(postQuery);
    }

    /**@Body() createNewPostDto: CreateNewPostDto*/
    // return this.postService.createNewPost(createNewPostDto);
    @Post()
    public createNewPost(
        @Body() createNewPostDto: CreateNewPostDto,
        @ActiveUser() user: ActiveUserData,
    ) {
        console.log(user);
        console.log(createNewPostDto);
    }

    @Delete()
    public deletePosts(@Query('id', ParseIntPipe) id: number) {
        return this.postService.deletePosts(id);
    }

    @Patch()
    public async updatePost(
        @Body() patchPostDto: PatchPostDto,
    ): Promise<Posts> {
        return this.postService.updatePost(patchPostDto);
    }
}
