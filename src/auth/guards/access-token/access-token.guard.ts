import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import jwtConfig from '../../config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../../constans/auth.constant';

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(
        /**
         *
         */
        private readonly jwtService: JwtService,

        /**
         * Injectin jwt config
         */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguraion: ConfigType<typeof jwtConfig>,
    ) {}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractRequestFromHeader(request);
        if (!token) throw new UnauthorizedException();

        try {
            const payload: unknown = await this.jwtService.verifyAsync(
                token,
                this.jwtConfiguraion,
            );

            request[REQUEST_USER_KEY] = payload;
            console.log(payload);
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractRequestFromHeader(req: Request) {
        const [_, token] = req.headers.authorization?.split(' ') ?? [];
        return token;
    }
}
