import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsJSON,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { SLUG_NAME_DESCRIPTION, SLUG_REQUIREMENT } from '../../utils/slug';

export class CreateTagsDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    name!: string;

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @IsNotEmpty()
    @Matches(SLUG_REQUIREMENT, { message: SLUG_NAME_DESCRIPTION })
    @ApiProperty({
        description: SLUG_NAME_DESCRIPTION,
        example: 'nest-js',
    })
    slug!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string;
}
