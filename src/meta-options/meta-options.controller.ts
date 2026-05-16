import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './meta-options.service';
import { CreatePostMetaOptionsDto } from './dto/create-post-metaoptions.dto';
import { MetaOptions } from './meta-options.entity';

@Controller('meta-options')
export class MetaOptionsController {
    /**
     * Inject metaOptionsService
     */
    constructor(private metaOptionsService: MetaOptionsService) {}

    @Post()
    public createMetaOptions(
        @Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto,
    ): Promise<MetaOptions> {
        return this.metaOptionsService.createMetaOptions(
            createPostMetaOptionsDto,
        );
    }
}
