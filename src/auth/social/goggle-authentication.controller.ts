import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthenticationService } from './google-authentication.service';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { Auth } from '../decarators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoggleAuthenticationController {
    constructor(
        private readonly googleAuthenticationService: GoogleAuthenticationService,
    ) {}

    @Post()
    public authenticate(@Body() googleTokenDto: GoogleTokenDto) {
        return this.googleAuthenticationService.authenticate(googleTokenDto);
    }
}
