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

export class CreateNewPostDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  title!: string;

  @IsEnum(PostTypeEnum)
  @IsNotEmpty()
  postType!: PostTypeEnum;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @Matches(/^[a-z0]+(?:[a-z0-9+]*$)/, {
    message:
      'A slug be all small letters and only "-" and without spaces. For example: "my-url"',
  })
  slug!: string;

  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status!: StatusEnum;

  @IsString()
  @MinLength(3)
  @IsOptional()
  content?: string;

  @IsOptional()
  @IsJSON()
  schema?: string;

  @IsUrl()
  @MinLength(3)
  @MaxLength(200)
  @IsOptional()
  featuredImageUrl?: string;

  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptions)
  metaOptions?: CreatePostMetaOptions[];
}
