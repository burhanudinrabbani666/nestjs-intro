import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../../config/jwt.config';
import { Request } from 'express';
import { RequestWithUserField } from '../../../common/custom-request/request-with-user';

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

    /**------------------------------------------------------------------------ /
     * Get Token from Header. If empty throw error                              /
     * Verify Jwt Token                                                         /
     * the custom Request Interaface was extended Request with User field       /
     * pass payload of jwtService.verifyAsync to request Body                   /
     ------------------------------------------------------------------------- */
    public async canActivate(context: ExecutionContext) {
        const request = context
            .switchToHttp()
            .getRequest<RequestWithUserField>();
        const token = this.extractRequestFromHeader(request);
        if (!token) throw new UnauthorizedException();

        try {
            const payload: unknown = await this.jwtService.verifyAsync(
                token,
                this.jwtConfiguraion,
            );

            request.user = payload;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractRequestFromHeader(req: Request) {
        console.log(req.headers.authorization);
        const [_, token] = req.headers.authorization?.split(' ') ?? [];
        return token;
    }
}
