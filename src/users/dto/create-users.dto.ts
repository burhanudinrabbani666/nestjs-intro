import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    firstName!: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(100)
    lastName?: string | undefined;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(50)
    @Matches(
        /^((?=.*[A-Za-z])(?=.*\d))(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        {
            message:
                'Password must be at least 8 characters long and contain at least one letter, one number, and one special character (@$!%*#?&).',
        },
    )
    password!: string;
}
