import {
    IsArray,
    IsEnum,
    IsISO8601,
    IsJSON,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    Matches,
    MaxLength,
    MinLength,
    ValidateNested,
} from 'class-validator';

import { PostTypeEnum } from './enums/postType.enum';
import { StatusEnum } from './enums/status.enum';
import { CreatePostMetaOptions } from './create-post-metaoptions.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNewPostDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @ApiProperty({
        description: 'This is for the blog post',
        example: 'NestJS is Opinioneted Framework ',
    })
    title!: string;

    @IsEnum(PostTypeEnum)
    @IsNotEmpty()
    @ApiProperty({
        enum: PostTypeEnum,
        description: "Posible value: 'POST', 'PAGE', 'STORY', and 'SERIES'",
    })
    postType!: PostTypeEnum;

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
            'A slug be all small letters and only "-" and without spaces. For example: "my-url"',
    })
    @ApiProperty({
        description:
            "A slug be all small letters and only '-' and without spaces. For example: 'my-url'",
        example: 'nest-js',
    })
    slug!: string;

    @IsNotEmpty()
    @IsEnum(StatusEnum)
    @ApiProperty({
        enum: StatusEnum,
        description:
            "Posible value: 'DRAFT', 'SCHEDULED', 'REVIEW', and 'PUBLISHED'",
        example: 'POST',
    })
    status!: StatusEnum;

    @IsString()
    @MinLength(3)
    @IsOptional()
    @ApiPropertyOptional({
        description: 'This is the content of the post',
        example: 'The post content',
    })
    content?: string;

    @IsOptional()
    @IsJSON()
    @ApiPropertyOptional({
        description:
            'Serialize your JSON object else a validation error will be thrown',
        example:
            '{\r\n "@context": "https://schema.org",\r\n "@type":"Person"\r\n}',
    })
    schema?: string;

    @IsUrl()
    @MinLength(3)
    @MaxLength(200)
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Featured image for your blog post',
        example: 'https://localhost:3000/images/imagesUrl',
        required: false,
    })
    featuredImageUrl?: string;

    @IsISO8601()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'The date on which the blog post was publish',
        required: false,
        example: '2024-03-16T07:46:32+0000',
    })
    publishOn?: Date;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @MinLength(3, { each: true })
    @ApiPropertyOptional({
        description: 'Array of tags passed as string values',
        example: ['NestJS', 'TypeScript'],
        required: false,
    })
    tags?: string[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptions)
    @ApiPropertyOptional({
        type: 'array',
        required: false,
        items: {
            type: 'object',
            properties: {
                key: {
                    type: 'string',
                    description:
                        'The key can be any strng identifier for your meta data options',
                    example: 'sidebarEnabled',
                },
                value: {
                    type: 'any',
                    description: 'Any Value that you want to save to the key',
                    example: true,
                },
            },
        },
    })
    metaOptions?: CreatePostMetaOptions[];
}
