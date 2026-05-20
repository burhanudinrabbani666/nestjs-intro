import {
    forwardRef,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type ConfigType } from '@nestjs/config';

import { SingInDto } from '../dtos/signin.dto';
import { UsersService } from '../../users/users.service';
import { HasingProviders } from './hasing.providers';
import jwtConfig from '../config/jwt.config';
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class SignInProviders {
    constructor(
        /**
         * InJect userService
         */
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        /**
         * InJect Hashing Providers
         */
        private readonly hasingProviders: HasingProviders,

        /**
         * Injecting jwtService
         */
        private readonly jwtService: JwtService,

        /**
         * Inject jwtConfig
         */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        /**
         * Inject generateTokenProvider
         */
        private readonly generateTokenProvider: GenerateTokenProvider,
    ) {}

    public async signIn(singInDto: SingInDto) {
        const user = await this.usersService.FindOneUserByEmail(
            singInDto.email,
        );

        // Compare the password
        const isEqual = await this.hasingProviders.comparePassword(
            singInDto.password,
            user.password ?? '',
        );

        if (!isEqual) throw new UnauthorizedException('Incorrect Password');

        return this.generateTokenProvider.generateTokens(user);
    }
}
