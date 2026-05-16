import {
    IsArray,
    IsEnum,
    IsInt,
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
import { CreatePostMetaOptionsDto } from '../../meta-options/dto/create-post-metaoptions.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SLUG_NAME_DESCRIPTION, SLUG_REQUIREMENT } from '../../utils/slug';

export class CreateNewPostDto {
    @IsString()
    @MinLength(3)
    @MaxLength(255)
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
    @MaxLength(255)
    @IsNotEmpty()
    @Matches(SLUG_REQUIREMENT, {
        message: SLUG_NAME_DESCRIPTION,
    })
    @ApiProperty({
        description: SLUG_NAME_DESCRIPTION,
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
    @MaxLength(1000)
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
    @IsInt({ each: true })
    @ApiPropertyOptional({
        description: "Array of id's of Tags ",
        example: [1, 2],
        required: false,
    })
    tags?: number[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    @ApiPropertyOptional({
        type: 'string',
        required: false,
        items: {
            type: 'object',
            properties: {
                metaValue: {
                    type: 'string',
                    description: 'The MetaValue is a Json Object',
                    example: '{"sidebarEnabled": true}',
                },
            },
        },
    })
    metaOptions?: CreatePostMetaOptionsDto;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({
        type: 'integer',
        required: true,
        example: 1,
    })
    authorId!: number;
}
