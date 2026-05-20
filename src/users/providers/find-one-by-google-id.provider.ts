import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneByGoogleIdProvider {
    constructor(
        /**
         * nject userRepository
         */
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public async findOneByGoogleId(googleId: string) {
        return await this.userRepository.findOne({ where: { googleId } });
    }
}
