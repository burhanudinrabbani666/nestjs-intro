import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
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
  public getPosts(@Param('userId') userId: string) {
    return this.postService.findAll(userId);
  }
}
