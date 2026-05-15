import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUserParamDto {
    @ApiProperty({
        description: 'Get User With Specific Id',
        example: 1234,
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    id!: number;
}
