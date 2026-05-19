import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(
        /**
         * Injecting Auth Services
         */
        private readonly authServices: AuthService,
    ) {}

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    public async signin(@Body() signInDto: SingInDto) {
        return this.authServices.signIn(signInDto);
    }
}
