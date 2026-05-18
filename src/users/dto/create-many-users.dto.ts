import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    ValidateNested,
} from 'class-validator';
import { CreateUserDto } from './create-users.dto';

export class CreateManyUsersDto {
    @ApiProperty({
        type: 'array',
        required: true,
        items: { type: 'User' },
    })
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateUserDto)
    users!: CreateUserDto[];
}
