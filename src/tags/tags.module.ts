import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './tags.entity';
import { TagsService } from './tags.service';

@Module({
    controllers: [TagsController],
    providers: [TagsService],
    exports: [TagsService],
    imports: [TypeOrmModule.forFeature([Tags])],
})
export class TagsModule {}
