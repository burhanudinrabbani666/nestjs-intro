import { Injectable } from '@nestjs/common';
import { CreateTagsDto } from './dtos/create-tags.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from './tags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tags)
        private readonly tagsRepository: Repository<Tags>,
    ) {}

    public async createTags(createTagsDto: CreateTagsDto): Promise<Tags> {
        const tags = this.tagsRepository.create(createTagsDto);
        return this.tagsRepository.save(tags);
    }
}
