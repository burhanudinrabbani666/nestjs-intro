import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SingInDto } from './dtos/signin.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        /**
         * Injecting Users Service
         */
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,
    ) {}

    public signIn(singInDto: SingInDto) {
        // Find the User using Email ID
        // User not Found? Throw execption
        // Compare the password
        // Send Confirmation
    }

    public isAuth() {
        return true;
    }
}
