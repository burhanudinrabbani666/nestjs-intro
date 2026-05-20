import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { HasingProviders } from './providers/hasing.providers';
import { BcryptProviders } from './providers/bcrypt.providers';
import { SignInProviders } from './providers/signin.providers';
import { GenerateTokenProvider } from './providers/generate-token.provider';
import { RefreshTokenProviders } from './providers/refresh-token.providers';
import { GoggleAuthenticationController } from './social/goggle-authentication.controller';
import jwtConfig from './config/jwt.config';
import { GoogleAuthenticationService } from './social/google-authentication.service';

@Module({
    controllers: [AuthController, GoggleAuthenticationController],
    providers: [
        AuthService,
        {
            provide: HasingProviders,
            useClass: BcryptProviders,
        },
        SignInProviders,
        GenerateTokenProvider,
        RefreshTokenProviders,
        GoogleAuthenticationService,
    ],
    exports: [AuthService, HasingProviders],
    imports: [
        forwardRef(() => UsersModule),
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
    ],
})
export class AuthModule {}
