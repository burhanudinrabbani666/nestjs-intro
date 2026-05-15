import { Controller } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    /**
     * Injecting Post Service
     */
    private readonly postService: PostsService,
  ) {}
}
