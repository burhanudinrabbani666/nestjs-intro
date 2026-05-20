import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dtos/signin.dto';
import { Auth } from './decarators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDTO } from './dtos/refresh-token.dto';

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
    @Auth(AuthType.None)
    public async signin(@Body() signInDto: SingInDto) {
        return this.authServices.signIn(signInDto);
    }

    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.None)
    public async refreshToken(@Body() refreshTokenDTO: RefreshTokenDTO) {
        return this.authServices.refreshToken(refreshTokenDTO);
    }
}
