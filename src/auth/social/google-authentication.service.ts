import {
    forwardRef,
    Inject,
    Injectable,
    OnModuleInit,
    UnauthorizedException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from '../config/jwt.config';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { ActiveUserData } from '../interface/active-users.interface';
import { UsersService } from '../../users/users.service';
import { GenerateTokenProvider } from '../providers/generate-token.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
    private oauthClient: OAuth2Client;
    constructor(
        /**
         * Inject jwtConfiguration
         */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        private readonly generateTokenProvider: GenerateTokenProvider,
    ) {
        const clientId = this.jwtConfiguration.googleClientId;
        const clientSecret = this.jwtConfiguration.googleClientSecret;
        this.oauthClient = new OAuth2Client(clientId, clientSecret);
    }

    onModuleInit() {
        const clientId = this.jwtConfiguration.googleClientId;
        const clientSecret = this.jwtConfiguration.googleClientSecret;
        this.oauthClient = new OAuth2Client(clientId, clientSecret);
    }

    public async authenticate(googleTokenDto: GoogleTokenDto) {
        const loginTicket = await this.oauthClient.verifyIdToken({
            idToken: googleTokenDto.token,
        });

        const payload = loginTicket.getPayload();
        if (!payload) throw new UnauthorizedException();
        const {
            email,
            sub: googleId,
            given_name: firstName,
            family_name: lastNamae,
        } = payload;

        const user = await this.usersService.findOneByGoogleId(googleId);

        // If googleId exis generate token
        if (user) {
            return this.generateTokenProvider.generateTokens(user);
        }

        // If not. Create a new User and the generate token
        // if(!user){
        //     await this.
        // }

        // throw Unauthorized
    }
}
