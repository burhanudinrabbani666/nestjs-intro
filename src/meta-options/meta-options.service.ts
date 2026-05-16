import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOptions } from './meta-options.entity';
import { Repository } from 'typeorm';
import { CreatePostMetaOptionsDto } from './dto/create-post-metaoptions.dto';

@Injectable()
export class MetaOptionsService {
    constructor(
        @InjectRepository(MetaOptions)
        private readonly metaOptionsRepository: Repository<MetaOptions>,
    ) {}

    public async createMetaOptions(
        createPostMetaOptionsDto: CreatePostMetaOptionsDto,
    ): Promise<MetaOptions> {
        const metaOptions = this.metaOptionsRepository.create(
            createPostMetaOptionsDto,
        );

        return this.metaOptionsRepository.save(metaOptions);
    }
}
