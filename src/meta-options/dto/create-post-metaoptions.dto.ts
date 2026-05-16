import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreatePostMetaOptions {
    @IsNotEmpty()
    @IsJSON()
    metaValue!: string;
}
