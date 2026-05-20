import { Inject, Injectable } from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import { type ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/users.entity';
import { ActiveUserData } from '../interface/active-users.interface';

@Injectable()
export class GenerateTokenProvider {
    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly jwtService: JwtService,
    ) {}
    public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload,
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn,
            },
        );
    }

    public async generateTokens(user: User) {
        const [accessToken, refreshToken] = await Promise.all([
            // Generate the Access Token
            this.signToken<Partial<ActiveUserData>>(
                user.id,
                this.jwtConfiguration.accessTokenTTL,
                { email: user.email },
            ),

            // Generate the Refresh Token
            this.signToken(user.id, this.jwtConfiguration.refreshTokenTTL),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
