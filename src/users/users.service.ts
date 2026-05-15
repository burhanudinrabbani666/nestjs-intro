import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

/** Class to Connect to users table and perform business logic */
@Injectable()
export class UsersService {
    /** Exports AuthServices */
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ) {}

    /** The Method to get all users from database */
    public findAll(limit: number, page: number) {
        const isAuth = this.authService.isAuth();
        console.log(isAuth);

        return [
            {
                firstName: 'burhanudin',
                email: 'bani@bani.io',
            },
            {
                firstName: 'Nico',
                email: 'nico@nico.io',
            },
            {
                firstName: 'Aziz',
                email: 'aziz@aziz.io',
            },
        ];
    }

    /** The Method to get one user by id from user from database */
    public findOneById(id: number) {
        return {
            id,
            firstName: 'Burhanudin',
            email: 'bani@bani.io',
        };
    }
}
