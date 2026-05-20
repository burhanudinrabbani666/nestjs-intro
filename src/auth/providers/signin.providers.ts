import {
    forwardRef,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { SingInDto } from '../dtos/signin.dto';
import { UsersService } from '../../users/users.service';
import { HasingProviders } from './hasing.providers';
import { JwtService } from '@nestjs/jwt';
import { type ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interface/active-users.interface';

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
    ) {}

    public async signIn(singInDto: SingInDto) {
        const user = await this.usersService.FindOneUserByEmail(
            singInDto.email,
        );

        // Compare the password
        const isEqual = await this.hasingProviders.comparePassword(
            singInDto.password,
            user.password,
        );

        if (!isEqual) throw new UnauthorizedException('Incorrect Password');

        const accessToken = await this.jwtService.signAsync(
            {
                sub: user.id,
                email: user.email,
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn: this.jwtConfiguration.accessTokenTTL,
            },
        );

        return {
            accessToken,
        };
    }
}
