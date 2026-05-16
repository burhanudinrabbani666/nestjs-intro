import { Injectable } from '@nestjs/common';
import { CreateTagsDto } from './dtos/create-tags.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from './tags.entity';
import { In, Repository } from 'typeorm';

/** Class to Connect to tags table and perform business logic */
@Injectable()
export class TagsService {
    /**
     * Injecting repository Tags
     */
    constructor(
        @InjectRepository(Tags)
        private readonly tagsRepository: Repository<Tags>,
    ) {}

    /**
     *
     */
    public async createTags(createTagsDto: CreateTagsDto): Promise<Tags> {
        const tag = this.tagsRepository.create(createTagsDto);
        return this.tagsRepository.save(tag);
    }

    public async findMultipleTags(tags: number[]) {
        const result = await this.tagsRepository.find({
            where: { id: In(tags) },
        });

        return result;
    }
}
