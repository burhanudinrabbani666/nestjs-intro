import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../posts.entity';
import { Repository } from 'typeorm';
import { TagsService } from '../../tags/tags.service';
import { CreateNewPostDto } from '../dto/create-post.dto';
import { ActiveUserData } from '../../auth/interface/active-users.interface';
import { Tags } from '../../tags/tags.entity';
import { Post } from '../interface/post.interface';

@Injectable()
export class CreatePostProvider {
    constructor(
        private readonly usersService: UsersService,
        @InjectRepository(Posts)
        private readonly postRepository: Repository<Posts>,
        private readonly tagsService: TagsService,
    ) {}

    public async createNewPost(
        createNewPostDto: CreateNewPostDto,
        user: ActiveUserData,
    ) {
        const author = await this.usersService.findOneById(user.sub);
        if (!author) throw new NotFoundException();

        let tags: Tags[] = [];
        if (createNewPostDto.tags) {
            tags = await this.tagsService.findMultipleTags(
                createNewPostDto.tags,
            );
        }

        if (tags.length !== createNewPostDto.tags?.length)
            throw new BadRequestException('Please Check Tags ID');

        const post = this.postRepository.create({
            ...createNewPostDto,
            tags,
            author,
        });

        return this.postRepository.save(post);
    }
}
