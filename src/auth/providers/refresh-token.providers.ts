import {
    forwardRef,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDTO } from '../dtos/refresh-token.dto';
import jwtConfig from '../config/jwt.config';
import { type ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokenProvider } from './generate-token.provider';
import { UsersService } from '../../users/users.service';
import { JwtPayloadInterface } from '../interface/jwt-payload.interface';
import { ActiveUserData } from '../interface/active-users.interface';

@Injectable()
export class RefreshTokenProviders {
    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly jwtService: JwtService,
        private readonly generateTokenProvider: GenerateTokenProvider,
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
    ) {}

    public async refreshToken(refreshTokenDTO: RefreshTokenDTO) {
        try {
            // verify the refresh token using jwtService
            const { sub } = await this.jwtService.verifyAsync<
                Pick<ActiveUserData, 'sub'>
            >(refreshTokenDTO.refreshToken, {
                secret: this.jwtConfiguration.secret,
                issuer: this.jwtConfiguration.issuer,
                audience: this.jwtConfiguration.audience,
            });

            // Fetch user form database
            const user = await this.usersService.findOneById(sub);

            // Generate the tokens
            return await this.generateTokenProvider.generateTokens(user);
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
