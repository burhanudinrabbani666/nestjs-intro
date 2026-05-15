import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PostEnum } from './enums/postType.enum';
import { StatusEnum } from './enums/status.enum';

export class CreateNewPostDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  title!: string;

  postType!: PostEnum;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  slug!: string;

  status!: StatusEnum;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  content?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  schema?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(200)
  featuredImageUrl?: string;

  @IsDate()
  publishOn?: Date;

  tags?: string[];

  metaOptions!: [{ key: 'sidebarEnabled'; value: true }];
}
