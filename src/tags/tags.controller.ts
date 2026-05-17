import {
    Body,
    Controller,
    Delete,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
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

    @Delete()
    public async deleteTags(@Query('id', ParseIntPipe) id: number) {
        return this.tagsService.deleteTags(id);
    }

    @Delete('soft-delete')
    public async softDeleteTags(@Query('id', ParseIntPipe) id: number) {
        return this.tagsService.softDeleteTags(id);
    }
}
