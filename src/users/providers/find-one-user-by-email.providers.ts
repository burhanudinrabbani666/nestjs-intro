import {
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users.entity';

@Injectable()
export class FindOneUserByEmailProviders {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public async findOneByEmail(email: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: { email },
            });

            if (!user) throw new UnauthorizedException();

            return user;
        } catch (error) {
            throw new InternalServerErrorException('Coul not Fetch the User', {
                cause: error,
            });
        }
    }
}
