import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SingInDto } from './dtos/signin.dto';
import { SignInProviders } from './providers/signin.providers';

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
    ) {}

    public async signIn(singInDto: SingInDto) {
        return this.signInProviders.signIn(singInDto);
    }

    public isAuth() {
        return true;
    }
}
