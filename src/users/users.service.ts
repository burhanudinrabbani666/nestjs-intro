import {
    Inject,
    Injectable,
    NotFoundException,
    RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-users.dto';
import { CreateManyUsersDto } from './dto/create-many-users.dto';
import { CreateUserProviders } from './providers/create-user.providers';
import { FindOneUserByEmailProviders } from './providers/find-one-user-by-email.providers';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';
import { GoogleUser } from './interfaces/google-user.interface';

/** Class to Connect to users table and perform business logic */
@Injectable()
export class UsersService {
    /** ----------------------------------------------------------- /
     * Exports AuthServices                                         /
     * Injecting Repository                                         /
     * Injeting profileConfig                                       /
     * Injecting DataSource                                         /
      ------------------------------------------------------------ */
    constructor(
        //--------------------------------------------------------------------
        @InjectRepository(User)
        private usersRepository: Repository<User>,

        //--------------------------------------------------------------------
        @Inject(DataSource)
        private readonly dataSource: DataSource,

        //--------------------------------------------------------------------
        private readonly usersCreateManyProvider: UsersCreateManyProvider,

        //--------------------------------------------------------------------
        private readonly createUserProviders: CreateUserProviders,

        //--------------------------------------------------------------------
        private readonly findOneUserByEmailProviders: FindOneUserByEmailProviders,

        //--------------------------------------------------------------------
        private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,

        //--------------------------------------------------------------------
        private readonly createGoogleUserProvider: CreateGoogleUserProvider,
    ) {}

    /** ----------------------------------------------------------- /
     * The Method to get all users from database                    /
     * 200: Success get Users                                       /
     * 500: Internal Server Error                                   /
     * 408: Failed Connect to database, timeout!                    /
        ---------------------------------------------------------- */
    public findAll() {
        return this.usersRepository.find();
    }

    public async createUser(createUserDto: CreateUserDto) {
        return this.createUserProviders.createUser(createUserDto);
    }

    /** ----------------------------------------------------------- /
     * The Method to get one user by id from user from database     /
     * 200: Success get User                                        /
     * 404: User Not Found                                          /
     * 408: Failed Connect to database, timeout!                    /
        ---------------------------------------------------------- */
    public async findOneById(id: number): Promise<User> {
        let user: User | null;
        try {
            user = await this.usersRepository.findOne({ where: { id } });
        } catch {
            throw new RequestTimeoutException(
                'Unable to proccess at the moment please try later',
                { description: 'Error connecting to the database' },
            );
        }

        if (!user)
            throw new NotFoundException(
                'User Not Found. Please Check Your User id',
                { description: 'User with Id not found' },
            );

        return user;
    }

    public async createManyUsers(createManyUserDto: CreateManyUsersDto) {
        return this.usersCreateManyProvider.createManyUser(createManyUserDto);
    }

    public async FindOneUserByEmail(email: string) {
        return await this.findOneUserByEmailProviders.findOneByEmail(email);
    }

    public async findOneByGoogleId(googleId: string) {
        return this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
    }

    public async createGoogleUser(googleUser: GoogleUser) {
        return await this.createGoogleUserProvider.createGoogleUser(googleUser);
    }
}
