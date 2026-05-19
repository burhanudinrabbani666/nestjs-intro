import {
    HttpException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class FindOneUserByEmailProviders {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public async findOneByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user)
            throw new UnauthorizedException(
                'User Not Found. Please check your Credential',
            );

        return user;
    }
}
