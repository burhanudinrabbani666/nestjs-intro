import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from '../../enums/auth-type.enum';
import { AUTH_TYPE_KEY } from '../../constans/auth.constant';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    private static readonly defaultAuthType = AuthType.Bearer;
    private readonly AuhtTypeGuardMap: Record<
        AuthType,
        CanActivate | CanActivate[]
    >;

    constructor(
        private readonly accessTokenGuard: AccessTokenGuard,
        private readonly reflactor: Reflector,
    ) {
        this.AuhtTypeGuardMap = {
            [AuthType.Bearer]: this.accessTokenGuard,
            [AuthType.None]: { canActivate: () => true },
        };
    }

    async canActivate(context: ExecutionContext) {
        // authType from reflector
        const authTypes = this.reflactor.getAllAndOverride<AuthType[]>(
            AUTH_TYPE_KEY,
            [context.getHandler(), context.getClass()],
        ) ?? [AuthenticationGuard.defaultAuthType];

        // array of guard
        const guards = authTypes
            .map((type) => this.AuhtTypeGuardMap[type])
            .flat();

        const error = new UnauthorizedException();

        // Loop guard canActivate
        for (const instance of guards) {
            const canActivated = await Promise.resolve(
                instance.canActivate(context),
            );

            if (canActivated) {
                return true;
            }
        }
        throw error;
    }
}
