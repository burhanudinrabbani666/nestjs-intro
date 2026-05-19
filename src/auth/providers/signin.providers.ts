import {
    forwardRef,
    Inject,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { SingInDto } from '../dtos/signin.dto';
import { UsersService } from '../../users/users.service';
import { HasingProviders } from './hasing.providers';

@Injectable()
export class SignInProviders {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        /**
         * InJect Hashing Providers
         */
        private readonly hasingProviders: HasingProviders,
    ) {}

    public async signIn(singInDto: SingInDto) {
        const user = await this.usersService.FindOneUserByEmail(
            singInDto.email,
        );

        // Compare the password
        const isEqual = await this.hasingProviders.comparePassword(
            singInDto.password,
            user.password,
        );

        if (!isEqual) throw new UnauthorizedException('Incorrect Password');
        return isEqual;
    }
}
