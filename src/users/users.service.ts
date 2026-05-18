import {
    ConflictException,
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    NotFoundException,
    RequestTimeoutException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import profileConfig from './config/profile.config';

import { AuthService } from '../auth/auth.service';
import { DataSource, Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersCreateManyProvider } from './provider/users-create-many.provider';
import { CreateManyUsersDto } from './dto/create-many-users.dto';
import { CreateUserProviders } from './providers/create-user.providers';

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
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,

        //--------------------------------------------------------------------
        @InjectRepository(User)
        private usersRepository: Repository<User>,

        //--------------------------------------------------------------------
        @Inject(profileConfig.KEY)
        private readonly profileConfiguration: ConfigType<typeof profileConfig>,

        //--------------------------------------------------------------------
        @Inject(DataSource)
        private readonly dataSource: DataSource,

        //--------------------------------------------------------------------
        private readonly usersCreateManyProvider: UsersCreateManyProvider,

        //--------------------------------------------------------------------
        private readonly createUserProviders: CreateUserProviders,
    ) {}

    /** ----------------------------------------------------------- /
     * The Method to get all users from database                    /
     * 200: Success get Users                                       /
     * 500: Internal Server Error                                   /
     * 408: Failed Connect to database, timeout!                    /
        ---------------------------------------------------------- */
    public findAll(limit?: number, page?: number) {
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
        try {
            const user = await this.usersRepository.findOne({ where: { id } });

            if (!user)
                throw new NotFoundException(
                    'User Not Found. Please Check Your User id',
                    { description: 'User with Id not found' },
                );

            return user;
        } catch (error) {
            console.error(error);
            throw new RequestTimeoutException(
                'Unable to proccess at the moment please try later',
                { description: 'Error connecting to the database' },
            );
        }
    }

    public async createManyUsers(createManyUserDto: CreateManyUsersDto) {
        return this.usersCreateManyProvider.createManyUser(createManyUserDto);
    }
}
