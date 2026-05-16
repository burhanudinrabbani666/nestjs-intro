import { Body, Controller, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagsDto } from './dtos/create-tags.dto';
import { Tags } from './tags.entity';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Post()
    public async createTags(
        @Body() createTagsDto: CreateTagsDto,
    ): Promise<Tags> {
        return this.tagsService.createTags(createTagsDto);
    }
}
