import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostMetaOptions {
    @IsString()
    @IsNotEmpty()
    key!: string;

    @IsNotEmpty()
    value!: any;
}
