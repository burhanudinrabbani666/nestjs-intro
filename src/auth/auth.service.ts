import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SingInDto } from './dtos/signin.dto';
import { SignInProviders } from './providers/signin.providers';
import { RefreshTokenDTO } from './dtos/refresh-token.dto';
import { RefreshTokenProviders } from './providers/refresh-token.providers';

@Injectable()
export class AuthService {
    constructor(
        /**
         * Injecting Users Service
         */
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,

        /**
         * Inject signInProviders
         */
        private readonly signInProviders: SignInProviders,
        /**
         * Inject refreshTokenPovider
         */
        private readonly refreshTokenProviders: RefreshTokenProviders,
    ) {}

    public async signIn(singInDto: SingInDto) {
        return this.signInProviders.signIn(singInDto);
    }

    public async refreshToken(refreshTokenDTO: RefreshTokenDTO) {
        return await this.refreshTokenProviders.refreshToken(refreshTokenDTO);
    }
}
