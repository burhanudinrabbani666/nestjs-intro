import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SingInDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}
