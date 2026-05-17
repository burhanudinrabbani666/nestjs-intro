import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

import { CreateNewPostDto } from './create-post.dto';

export class PatchPostDto extends PartialType(CreateNewPostDto) {
    @ApiProperty({
        description: 'The ID of the post needs to be updated',
    })
    @IsInt()
    @IsNotEmpty()
    id!: number;
}
