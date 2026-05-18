import {
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import profileConfig from './config/profile.config';

import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-users.dto';

/** Class to Connect to users table and perform business logic */
@Injectable()
export class UsersService {
    /** ------------------------------------------------|
     * Exports AuthServices                             |
     * Injecting Repository                             |
     * Injeting profileConfig                           |
     * */ //--------------------------------------------|
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @Inject(profileConfig.KEY)
        private readonly profileConfiguration: ConfigType<typeof profileConfig>,
    ) {}

    public async createUser(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.usersRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existingUser) throw new ConflictException('Email Already Exist');

        // Create A new User
        const newUser = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(newUser);
    }

    /** The Method to get all users from database */
    public findAll(limit: number, page: number) {
        // Test config
        console.log(this.profileConfiguration);
        console.log(this.profileConfiguration.apiKey);

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
    public async findOneById(id: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }
}
